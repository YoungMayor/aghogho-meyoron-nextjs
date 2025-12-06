import { NextResponse } from 'next/server';
import { verifyApiAuth } from '@/lib/utils/api-auth';
import { academicRecords } from '@/lib/data/academic_history';
import { careerItems } from '@/lib/data/career_history';
import {
  getVisibleItems,
  sortByDate,
  paginateItems,
} from '@/lib/utils/data';

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
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    const page = Math.floor(offset / limit) + 1;

    if (typeFilter === 'career') {
      // Get career items
      const items = getVisibleItems(careerItems);
      const sortedItems = sortByDate(items, 'start_date');
      const paginatedResult = paginateItems(sortedItems, page, limit);

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
    } else if (typeFilter === 'academic') {
      // Get academic records
      const items = getVisibleItems(academicRecords);
      const sortedItems = sortByDate(items, 'start_year');
      const paginatedResult = paginateItems(sortedItems, page, limit);

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
    } else {
      // Return both if no type specified
      const career = sortByDate(getVisibleItems(careerItems), 'start_date');
      const academic = sortByDate(
        getVisibleItems(academicRecords),
        'start_year'
      );

      return NextResponse.json({
        success: true,
        data: {
          career,
          academic,
        },
      });
    }
  } catch (error) {
    console.error('History API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'Failed to fetch history data',
      },
      { status: 500 }
    );
  }
}
