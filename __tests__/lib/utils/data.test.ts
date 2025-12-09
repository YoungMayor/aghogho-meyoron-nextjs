import { getVisibleItems, sortByPriority, sortByDate, paginateItems } from '@/lib/utils/data';

describe('Data Utility Functions', () => {
  describe('getVisibleItems', () => {
    it('should filter items with show: true', () => {
      const items = [
        { show: true, name: 'Item 1', priority: 1 },
        { show: false, name: 'Item 2', priority: 2 },
        { show: true, name: 'Item 3', priority: 3 },
      ];

      const result = getVisibleItems(items);
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Item 1');
      expect(result[1].name).toBe('Item 3');
    });

    it('should return empty array when no items are visible', () => {
      const items = [
        { show: false, name: 'Item 1', priority: 1 },
        { show: false, name: 'Item 2', priority: 2 },
      ];

      const result = getVisibleItems(items);
      expect(result).toHaveLength(0);
    });

    it('should return empty array for empty input', () => {
      const result = getVisibleItems([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('sortByPriority', () => {
    it('should sort items by priority in ascending order by default', () => {
      const items = [
        { priority: 1, name: 'Low', show: true },
        { priority: 3, name: 'High', show: true },
        { priority: 2, name: 'Medium', show: true },
      ];

      const result = sortByPriority(items);
      expect(result[0].name).toBe('Low');
      expect(result[1].name).toBe('Medium');
      expect(result[2].name).toBe('High');
    });

    it('should sort items by priority in descending order when specified', () => {
      const items = [
        { priority: 1, name: 'Low', show: true },
        { priority: 3, name: 'High', show: true },
        { priority: 2, name: 'Medium', show: true },
      ];

      const result = sortByPriority(items, 'desc');
      expect(result[0].name).toBe('High');
      expect(result[1].name).toBe('Medium');
      expect(result[2].name).toBe('Low');
    });

    it('should maintain order for equal priorities', () => {
      const items = [
        { priority: 1, name: 'First', show: true },
        { priority: 1, name: 'Second', show: true },
      ];

      const result = sortByPriority(items);
      expect(result[0].name).toBe('First');
      expect(result[1].name).toBe('Second');
    });

    it('should handle empty array', () => {
      const result = sortByPriority([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('sortByDate', () => {
    it('should sort items by date in descending order (most recent first)', () => {
      const items = [
        { date: '2020-01-01', name: 'Old' },
        { date: '2023-01-01', name: 'New' },
        { date: '2021-06-15', name: 'Middle' },
      ];

      const result = sortByDate(items, 'date');
      expect(result[0].name).toBe('New');
      expect(result[1].name).toBe('Middle');
      expect(result[2].name).toBe('Old');
    });

    it('should handle invalid dates', () => {
      const items = [
        { date: '2020-01-01', name: 'Old' },
        { date: '2023-01-01', name: 'New' },
        { date: '2021-06-15', name: 'Middle' },
      ];

      const result = sortByDate(items, 'date');
      expect(result).toHaveLength(3);
      // Most recent first
      expect(result[0].name).toBe('New');
    });

    it('should handle empty array', () => {
      const result = sortByDate([], 'date');
      expect(result).toHaveLength(0);
    });
  });

  describe('paginateItems', () => {
    const items = Array.from({ length: 25 }, (_, i) => ({ id: i + 1 }));

    it('should paginate items correctly', () => {
      const result = paginateItems(items, 1, 10);
      expect(result.items).toHaveLength(10);
      expect(result.items[0].id).toBe(1);
      expect(result.total).toBe(25);
      expect(result.page).toBe(1);
      expect(result.perPage).toBe(10);
      expect(result.totalPages).toBe(3);
    });

    it('should handle last page with remaining items', () => {
      const result = paginateItems(items, 3, 10);
      expect(result.items).toHaveLength(5);
      expect(result.items[0].id).toBe(21);
    });

    it('should handle page beyond total pages', () => {
      const result = paginateItems(items, 10, 10);
      expect(result.items).toHaveLength(0);
      expect(result.totalPages).toBe(3);
    });

    it('should handle empty array', () => {
      const result = paginateItems([], 1, 10);
      expect(result.items).toHaveLength(0);
      expect(result.total).toBe(0);
      expect(result.totalPages).toBe(0);
    });

    it('should default to page 1 and perPage 10', () => {
      const result = paginateItems(items);
      expect(result.page).toBe(1);
      expect(result.perPage).toBe(10);
    });
  });
});
