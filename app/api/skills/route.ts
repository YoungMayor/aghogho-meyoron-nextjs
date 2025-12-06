import { NextResponse } from 'next/server';
import { verifyApiAuth } from '@/lib/utils/api-auth';
import { skills, technicalSkills, softSkills } from '@/lib/data/skills';
import { getVisibleAndSorted } from '@/lib/utils/data';

/**
 * GET /api/skills
 * Returns skills and expertise
 * Requires authentication
 */
export async function GET(request: Request) {
  const secret = process.env.INTERNAL_API_SECRET;

  if (!secret) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  // Verify authentication
  if (!verifyApiAuth(request, secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    return NextResponse.json({
      success: true,
      data: {
        all: getVisibleAndSorted(skills),
        technical: getVisibleAndSorted(technicalSkills),
        soft: getVisibleAndSorted(softSkills),
      },
    });
  } catch (error) {
    console.error('Skills API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'Failed to fetch skills data',
      },
      { status: 500 }
    );
  }
}
