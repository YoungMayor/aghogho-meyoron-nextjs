import { ApiResponse } from '@/lib/utils/api-response';
import { projects } from '@/lib/data/projects';
import { getVisibleItems, sortByPriority, paginateItems } from '@/lib/utils/data';
import { apiAction } from '@/lib/utils/api-action';

/**
 * GET /api/projects
 * Returns all visible projects with optional filtering
 * Query params:
 *  - stack_role: Filter by project stack role
 *  - segment: Filter by project segment
 *  - technologies: Filter by technologies (comma-separated)
 *  - limit: Pagination limit (default: 10)
 *  - offset: Pagination offset (default: 0)
 * Requires authentication
 */
export async function GET(request: Request) {
  return apiAction({
    request,
    async callback() {
      const { searchParams } = new URL(request.url);
      const stackRoleFilter = searchParams.get('stack_role');
      const segmentFilter = searchParams.get('segment');
      const technologiesFilter = searchParams.get('technologies');
      const limit = parseInt(searchParams.get('limit') || '10', 10);
      const offset = parseInt(searchParams.get('offset') || '0', 10);

      let filteredProjects = getVisibleItems(projects);

      if (stackRoleFilter) {
        filteredProjects = filteredProjects.filter((p) =>
          (p.stack_role as string[]).includes(stackRoleFilter)
        );
      }

      if (segmentFilter) {
        filteredProjects = filteredProjects.filter((p) =>
          (p.segment as string[]).includes(segmentFilter)
        );
      }

      if (technologiesFilter) {
        const techArray = technologiesFilter.split(',').map((t) => t.trim().toLowerCase());
        filteredProjects = filteredProjects.filter((p) =>
          p.icons.some((icon) => techArray.includes(icon.label.toLowerCase()))
        );
      }

      filteredProjects = sortByPriority(filteredProjects);

      const page = Math.floor(offset / limit) + 1;
      const paginatedResult = paginateItems(filteredProjects, page, limit);

      return ApiResponse.paginated(paginatedResult);
    },
  });
}
