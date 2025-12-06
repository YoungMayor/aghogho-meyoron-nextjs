import { NextResponse } from 'next/server';
import { verifyApiAuth } from '@/lib/utils/api-auth';
import { profile } from '@/lib/data/profile';
import { academicRecords } from '@/lib/data/academic_history';
import { careerItems } from '@/lib/data/career_history';
import { projects } from '@/lib/data/projects';
import { skills } from '@/lib/data/skills';
import { articles } from '@/lib/data/articles';
import { testimonials } from '@/lib/data/testimonials';
import { socialLinks } from '@/lib/data/social_links';
import { hobbies } from '@/lib/data/hobbies';
import { badges } from '@/lib/data/badges';
import { getVisibleAndSorted } from '@/lib/utils/data';

/**
 * GET /api/profile
 * Returns complete profile information with all nested data
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
    // Build complete profile with all data
    const completeProfile = {
      ...profile,
      history: {
        academic: getVisibleAndSorted(academicRecords),
        career: getVisibleAndSorted(careerItems),
      },
      portfolio: {
        projects: getVisibleAndSorted(projects),
        articles: getVisibleAndSorted(articles),
      },
      skills: getVisibleAndSorted(skills),
      testimonials: getVisibleAndSorted(testimonials),
      social_links: getVisibleAndSorted(socialLinks),
      hobbies: getVisibleAndSorted(hobbies),
      badges,
    };

    return NextResponse.json({
      success: true,
      data: completeProfile,
    });
  } catch (error) {
    console.error('Profile API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'Failed to fetch profile data',
      },
      { status: 500 }
    );
  }
}
