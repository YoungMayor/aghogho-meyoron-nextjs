import { aiProfile } from '@/lib/data/ai_profile';
import { apiAction } from '@/lib/utils/api-action';
import { ApiResponse } from '@/lib/utils/api-response';

/**
 * GET /api/profile/ai
 * Returns complete AI profile information with all nested data
 * Requires authentication
 */
export async function GET(request: Request) {
  return apiAction({ request }, async () => {
    return ApiResponse.success(aiProfile);
  });
}
