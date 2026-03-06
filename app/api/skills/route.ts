import { ApiResponse } from '@/lib/utils/api-response';
import { skills, technicalSkills, softSkills } from '@/lib/data/skills';
import { getVisibleAndSorted } from '@/lib/utils/data';
import { apiAction } from '@/lib/utils/api-action';

/**
 * GET /api/skills
 * Returns skills and expertise
 * Requires authentication
 */
export async function GET(request: Request) {
  return apiAction({
    request,
    async callback() {
      return ApiResponse.success({
        all: getVisibleAndSorted(skills),
        technical: getVisibleAndSorted(technicalSkills),
        soft: getVisibleAndSorted(softSkills),
      });
    },
  });
}
