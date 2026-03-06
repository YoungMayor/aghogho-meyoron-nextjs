'use server';

import { GoogleGenAI } from '@google/genai';
import connectDB from '@/lib/db/mongodb';
import { JobApplication } from '@/lib/db/models/job_application';
import { aiProfile } from '@/lib/data/ai_profile';
import { serverEnv } from '@/lib/env/server';

const apiKey = serverEnv.GEMINI_API_KEY;

if (!apiKey) {
  console.warn('GEMINI_API_KEY is not set. AI functions will fail.');
}

const ai = new GoogleGenAI({ apiKey: apiKey! });

export async function generateJobSummary(
  companyName: string,
  role: string,
  link: string,
  jobDescription: string
) {
  if (!jobDescription || !companyName) {
    throw new Error('Company Name and Job Description are required');
  }

  await connectDB();

  const prompt = `You are an expert technical recruiter and career coach.
Extract the key information from the following job description and summarize it comprehensively.
Focus on:
1. Core responsibilities
2. Required technical skills and experience
3. Nice-to-have skills
4. Company culture or perks mentioned
5. Overall tone of the job description (e.g., formal, startup-vibe, fast-paced)

Company: ${companyName}
Role: ${role || 'Not specified'}
Link: ${link || 'Not specified'}

Job Description:
${jobDescription}

Format the summary in Markdown.`;

  try {
    const response = await ai.models.generateContent({
      model: serverEnv.GEMINI_MODEL,
      contents: prompt,
    });

    const jobSummary = response.text || '';

    const application = await JobApplication.create({
      company_name: companyName,
      role,
      link,
      job_description: jobDescription,
      job_summary: jobSummary,
      generated_outputs: {},
    });

    return {
      jobSummary,
      applicationId: application._id.toString(),
    };
  } catch (error: unknown) {
    console.error('Action Summarize Error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to generate summary');
  }
}

export async function generateApplicationOutput(
  applicationId: string,
  type: 'cover_letter' | 'recruiter_dm' | 'short_pitch' | 'custom',
  customPrompt?: string
) {
  if (!applicationId || !type) {
    throw new Error('Application ID and output type are required');
  }

  await connectDB();

  const application = await JobApplication.findById(applicationId);

  if (!application) {
    throw new Error('Application not found');
  }

  const jobSummary = application.job_summary;

  const systemInstruction = `You are an expert career agent writing on behalf of an applicant.
Here is the applicant's complete profile:
${JSON.stringify(aiProfile, null, 2)}

Here is the summary of the job they are applying for:
${jobSummary}
`;

  let userPrompt = '';

  if (type === 'cover_letter') {
    userPrompt = `Write a compelling, tailored cover letter for this role. Do not invent experience I don't have, but highlight overlap between my skills/projects and their requirements. Keep it professional, concise, and engaging.`;
  } else if (type === 'recruiter_dm') {
    userPrompt = `Write a short, punchy Direct Message (DM) to a recruiter or hiring manager on LinkedIn. Keep it under 600 characters. It should express interest, highlight 1 or 2 highly matching skills, and end with a clear call to action.`;
  } else if (type === 'short_pitch') {
    userPrompt = `Write an elevator pitch (3-4 sentences max) that I can use to describe my fit for this role. Focus on my most relevant experience and why I am uniquely qualified.`;
  } else if (type === 'custom') {
    if (!customPrompt) {
      throw new Error('Custom prompt is required for custom type');
    }
    userPrompt = `Answer or fulfill the following request based on the job summary and my profile:
${customPrompt}`;
  } else {
    throw new Error('Invalid output type');
  }

  try {
    const response = await ai.models.generateContent({
      model: serverEnv.GEMINI_MODEL,
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    const text = response.text || '';

    if (type === 'custom') {
      if (!application.generated_outputs) {
        application.generated_outputs = {};
      }
      if (!application.generated_outputs.custom_qa) {
        application.generated_outputs.custom_qa = [];
      }
      application.generated_outputs.custom_qa.push({ question: customPrompt!, answer: text });
    } else {
      if (!application.generated_outputs) {
        application.generated_outputs = {};
      }
      if (type === 'cover_letter') application.generated_outputs.cover_letter = text;
      if (type === 'recruiter_dm') application.generated_outputs.recruiter_dm = text;
      if (type === 'short_pitch') application.generated_outputs.short_pitch = text;
    }

    await application.save();

    return { output: text };
  } catch (error: unknown) {
    console.error('Action Generate Output Error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to generate output');
  }
}
