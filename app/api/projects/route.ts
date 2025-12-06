import { NextResponse } from 'next/server';
import { verifyApiAuth } from '@/lib/utils/api-auth';
import { projects } from '@/lib/data/projects';
import { getVisibleItems, sortByPriority, paginateItems } from '@/lib/utils/data';

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
  const secret = process.env.INTERNAL_API_SECRET;

  if (!secret) {
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  // Verify authentication
  if (!verifyApiAuth(request, secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const typeFilter = searchParams.get('type');
    const ownerFilter = searchParams.get('owner');
    const technologiesFilter = searchParams.get('technologies');
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    // Start with visible projects
    let filteredProjects = getVisibleItems(projects);

    // Apply type filter
    if (typeFilter) {
      filteredProjects = filteredProjects.filter((p) => p.type === typeFilter);
    }

    // Apply owner filter
    if (ownerFilter) {
      filteredProjects = filteredProjects.filter(
        (p) => p.owner === ownerFilter
      );
    }

    // Apply technologies filter
    if (technologiesFilter) {
      const techArray = technologiesFilter.split(',').map((t) => t.trim().toLowerCase());
      filteredProjects = filteredProjects.filter((p) =>
        p.technologies.some((tech) =>
          techArray.includes(tech.name.toLowerCase())
        )
      );
    }

    // Sort by priority
    filteredProjects = sortByPriority(filteredProjects);

    // Calculate pagination
    const page = Math.floor(offset / limit) + 1;
    const paginatedResult = paginateItems(filteredProjects, page, limit);

    return NextResponse.json({
      success: true,
      data: paginatedResult.items,
      pagination: {
        total: paginatedResult.total,
        page: paginatedResult.page,
        perPage: paginatedResult.perPage,
        totalPages: paginatedResult.totalPages,
        hasNext: paginatedResult.hasNext,
        hasPrev: paginatedResult.hasPrev,
      },
    });
  } catch (error) {
    console.error('Projects API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'Failed to fetch projects',
      },
      { status: 500 }
    );
  }
}
