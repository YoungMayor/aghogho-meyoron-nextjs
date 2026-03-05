import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import connectDB from '@/lib/db/mongodb';
import { JobApplication } from '@/lib/db/models/job_application';
import { aiProfile } from '@/lib/data/ai_profile';

export async function POST(req: Request) {
  try {
    const { applicationId, type, customPrompt } = await req.json();

    if (!applicationId || !type) {
      return NextResponse.json(
        { error: 'Application ID and output type are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const application = await JobApplication.findById(applicationId);

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    const jobSummary = application.job_summary;

    const systemPrompt = `You are an expert career agent writing on behalf of an applicant.
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
        return NextResponse.json(
          { error: 'Custom prompt is required for custom type' },
          { status: 400 }
        );
      }
      userPrompt = `Answer or fulfill the following request based on the job summary and my profile:
${customPrompt}`;
    } else {
      return NextResponse.json({ error: 'Invalid output type' }, { status: 400 });
    }

    const { text } = await generateText({
      model: openai('gpt-4o'),
      system: systemPrompt,
      prompt: userPrompt,
    });

    const mappedType =
      type === 'cover_letter'
        ? 'cover_letter'
        : type === 'recruiter_dm'
          ? 'recruiter_dm'
          : type === 'short_pitch'
            ? 'short_pitch'
            : 'custom';

    if (mappedType === 'custom') {
      if (!application.generated_outputs) {
        application.generated_outputs = {};
      }
      if (!application.generated_outputs.custom_qa) {
        application.generated_outputs.custom_qa = [];
      }
      application.generated_outputs.custom_qa.push({ question: customPrompt, answer: text });
    } else {
      if (!application.generated_outputs) {
        application.generated_outputs = {};
      }
      // TypeScript compiler complains about string indexing sometimes, so we typecast or ignore it
      // but generated_outputs has specific keys
      if (mappedType === 'cover_letter') application.generated_outputs.cover_letter = text;
      if (mappedType === 'recruiter_dm') application.generated_outputs.recruiter_dm = text;
      if (mappedType === 'short_pitch') application.generated_outputs.short_pitch = text;
    }

    await application.save();

    return NextResponse.json({ output: text });
  } catch (error: unknown) {
    console.error('API Generate Output Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate output' },
      { status: 500 }
    );
  }
}
