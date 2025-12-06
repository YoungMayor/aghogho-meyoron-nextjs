import { HasVisibility } from '@/lib/types';

/**
 * Filter items by visibility (show: true)
 */
export function getVisibleItems<T extends HasVisibility>(items: T[]): T[] {
  return items.filter((item) => item.show);
}

/**
 * Sort items by priority (higher priority first)
 */
export function sortByPriority<T extends HasVisibility>(items: T[]): T[] {
  return [...items].sort((a, b) => b.priority - a.priority);
}

/**
 * Get visible items sorted by priority
 */
export function getVisibleAndSorted<T extends HasVisibility>(items: T[]): T[] {
  return sortByPriority(getVisibleItems(items));
}

/**
 * Sort items by date (most recent first)
 * @param items Array of items with date properties
 * @param dateField Name of the date field to sort by
 */
export function sortByDate<T>(items: T[], dateField: keyof T): T[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a[dateField] as string | number).getTime();
    const dateB = new Date(b[dateField] as string | number).getTime();
    return dateB - dateA; // Most recent first
  });
}

/**
 * Paginate items
 */
export function paginateItems<T>(
  items: T[],
  page: number = 1,
  perPage: number = 10
): {
  items: T[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
} {
  const total = items.length;
  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage;
  const end = start + perPage;

  return {
    items: items.slice(start, end),
    page,
    perPage,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}
