import { cloudinaryImage } from '@/lib/utils/helpers';

describe('Helper Utility Functions', () => {
  describe('cloudinaryImage', () => {
    it('should generate correct Cloudinary URL', () => {
      const result = cloudinaryImage('test.jpg', 'folder');
      expect(result).toBe(
        'https://res.cloudinary.com/meyoron-aghogho/image/upload/folder/test.jpg'
      );
    });

    it('should handle different filenames', () => {
      const result = cloudinaryImage('image-123.png', 'my-folder');
      expect(result).toContain('my-folder/image-123.png');
    });
  });

  describe('cloudinaryImage.dartCodeshot', () => {
    it('should generate URL for Dart codeshot', () => {
      const result = cloudinaryImage.dartCodeshot('code.jpg');
      expect(result).toContain('projects/codeshots/dart/code.jpg');
    });
  });

  describe('cloudinaryImage.goCodeshot', () => {
    it('should generate URL for Go codeshot', () => {
      const result = cloudinaryImage.goCodeshot('code.jpg');
      expect(result).toContain('projects/codeshots/go/code.jpg');
    });
  });

  describe('cloudinaryImage.jsCodeshot', () => {
    it('should generate URL for JS codeshot', () => {
      const result = cloudinaryImage.jsCodeshot('code.jpg');
      expect(result).toContain('projects/codeshots/js/code.jpg');
    });
  });

  describe('cloudinaryImage.people', () => {
    it('should generate URL for people images', () => {
      const result = cloudinaryImage.people('person.jpg');
      expect(result).toContain('people/person.jpg');
    });
  });

  describe('cloudinaryImage.portfolio', () => {
    it('should generate URL for portfolio images', () => {
      const result = cloudinaryImage.portfolio('portfolio.jpg');
      expect(result).toContain('projects/portfolios/portfolio.jpg');
    });
  });

  describe('cloudinaryImage.project', () => {
    it('should generate URL for project images', () => {
      const result = cloudinaryImage.project('project.jpg');
      expect(result).toContain('projects/project.jpg');
    });
  });
});
