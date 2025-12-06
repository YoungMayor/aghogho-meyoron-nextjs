
import { verifyApiAuth } from '@/lib/utils/api-auth';
import { ApiResponse } from '@/lib/utils/api-response';
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
    return ApiResponse.serverError('Server configuration error');
  }

  // Verify authentication
  if (!verifyApiAuth(request, secret)) {
    return ApiResponse.unauthorized();
  }

  try {
    return ApiResponse.success({
      all: getVisibleAndSorted(skills),
      technical: getVisibleAndSorted(technicalSkills),
      soft: getVisibleAndSorted(softSkills),
    });
  } catch (error) {
    console.error('Skills API error:', error);
    return ApiResponse.serverError('Failed to fetch skills data');
  }
}
