import { ApiResponse } from '@/lib/utils/api-response';
import { projects } from '@/lib/data/projects';
import { getVisibleItems, sortByPriority, paginateItems } from '@/lib/utils/data';
import { apiAction } from '@/lib/utils/api-action';

/**
 * GET /api/projects
 * Returns all visible projects with optional filtering
 * Query params:
 *  - type: Filter by project type
 *  - owner: Filter by project owner
 *  - technologies: Filter by technologies (comma-separated)
 *  - limit: Pagination limit (default: 10)
 *  - offset: Pagination offset (default: 0)
 * Requires authentication
 */
export async function GET(request: Request) {
  return apiAction({ request }, async (request) => {
    const { searchParams } = new URL(request.url);
    const typeFilter = searchParams.get('type');
    const ownerFilter = searchParams.get('owner');
    const technologiesFilter = searchParams.get('technologies');
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    let filteredProjects = getVisibleItems(projects);

    if (typeFilter) {
      filteredProjects = filteredProjects.filter((p) => p.type === typeFilter);
    }

    if (ownerFilter) {
      filteredProjects = filteredProjects.filter((p) => p.owner === ownerFilter);
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
  });
}
