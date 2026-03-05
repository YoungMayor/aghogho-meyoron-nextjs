import { ApiResponse } from '@/lib/utils/api-response';
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
import { apiAction } from '@/lib/utils/api-action';

/**
 * GET /api/profile
 * Returns complete profile information with all nested data
 * Requires authentication
 */
export async function GET(request: Request) {
  return apiAction({ request }, async () => {
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

    return ApiResponse.success(completeProfile);
  });
}
