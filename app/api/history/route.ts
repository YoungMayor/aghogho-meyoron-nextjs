import { ApiResponse } from '@/lib/utils/api-response';
import { academicRecords } from '@/lib/data/academic_history';
import { careerItems } from '@/lib/data/career_history';
import { getVisibleItems, sortByDate, paginateItems } from '@/lib/utils/data';
import { apiAction } from '@/lib/utils/api-action';

/**
 * GET /api/history
 * Returns history (career or academic) with optional filtering
 * Query params:
 *  - type: Filter by type ('career' or 'academic')
 *  - limit: Pagination limit (default: 10)
 *  - offset: Pagination offset (default: 0)
 * Requires authentication
 */
export async function GET(request: Request) {
  return await apiAction({ request }, async (request) => {
    const { searchParams } = new URL(request.url);
    const typeFilter = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    const page = Math.floor(offset / limit) + 1;

    if (typeFilter === 'career') {
      const items = getVisibleItems(careerItems);
      const sortedItems = sortByDate(items, 'start_date');
      const paginatedResult = paginateItems(sortedItems, page, limit);

      return ApiResponse.paginated(paginatedResult);
    } else if (typeFilter === 'academic') {
      const items = getVisibleItems(academicRecords);
      const sortedItems = sortByDate(items, 'start_year');
      const paginatedResult = paginateItems(sortedItems, page, limit);

      return ApiResponse.paginated(paginatedResult);
    } else {
      const career = sortByDate(getVisibleItems(careerItems), 'start_date');
      const academic = sortByDate(getVisibleItems(academicRecords), 'start_year');

      return ApiResponse.success({
        career,
        academic,
      });
    }
  });
}
