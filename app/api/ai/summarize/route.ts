import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import connectDB from '@/lib/db/mongodb';
import { JobApplication } from '@/lib/db/models/job_application';

export async function POST(req: Request) {
  try {
    const { companyName, role, link, jobDescription } = await req.json();

    if (!jobDescription || !companyName) {
      return NextResponse.json(
        { error: 'Company Name and Job Description are required' },
        { status: 400 }
      );
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

    const { text } = await generateText({
      model: openai('gpt-4o'),
      prompt,
    });

    const jobSummary = text;

    const application = await JobApplication.create({
      company_name: companyName,
      role,
      link,
      job_description: jobDescription,
      job_summary: jobSummary,
      generated_outputs: {},
    });

    return NextResponse.json({
      jobSummary,
      applicationId: application._id,
    });
  } catch (error: unknown) {
    console.error('API Summarize Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate summary' },
      { status: 500 }
    );
  }
}
