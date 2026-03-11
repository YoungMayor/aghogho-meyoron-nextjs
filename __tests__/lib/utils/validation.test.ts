import { contactFormSchema, mentorshipFormSchema, sanitizeInput } from '@/lib/utils/validation';

describe('Validation Utility Functions', () => {
  describe('contactFormSchema', () => {
    it('should pass validation for valid contact form', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'This is a test message that is long enough to pass validation',
      };

      const result = contactFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should fail validation for invalid name', () => {
      const invalidData = {
        name: 'J',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'This is a test message that is long enough to pass validation',
      };

      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i) => i.path.includes('name'))).toBe(true);
      }
    });

    it('should fail validation for invalid email', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'invalid-email',
        subject: 'Test Subject',
        message: 'This is a test message that is long enough to pass validation',
      };

      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i) => i.path.includes('email'))).toBe(true);
      }
    });

    it('should fail validation for short message', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Too short',
      };

      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i) => i.path.includes('message'))).toBe(true);
      }
    });
  });

  describe('mentorshipFormSchema', () => {
    it('should pass validation for valid mentorship form', () => {
      const validData = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1234567890',
        background: 'This is my background story. '.repeat(10),
        goals: 'These are my goals and expectations. '.repeat(10),
        commitment: '10 hours/week',
      };

      const result = mentorshipFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should pass validation without phone', () => {
      const validData = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        background: 'This is my background story. '.repeat(10),
        goals: 'These are my goals and expectations. '.repeat(10),
        commitment: '10 hours/week',
      };

      const result = mentorshipFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should fail validation for invalid phone', () => {
      const invalidData = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: 'invalid',
        background: 'This is my background story. '.repeat(10),
        goals: 'These are my goals and expectations. '.repeat(10),
        commitment: '10 hours/week',
      };

      const result = mentorshipFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i) => i.path.includes('phone'))).toBe(true);
      }
    });

    it('should fail validation for short background', () => {
      const invalidData = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        background: 'Too short',
        goals: 'These are my goals and expectations. '.repeat(10),
        commitment: '10 hours/week',
      };

      const result = mentorshipFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i) => i.path.includes('background'))).toBe(true);
      }
    });
  });

  describe('sanitizeInput', () => {
    it('should sanitize HTML characters', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe(
        '&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;'
      );
    });

    it('should trim whitespace', () => {
      expect(sanitizeInput('  test  ')).toBe('test');
    });

    it('should handle empty string', () => {
      expect(sanitizeInput('')).toBe('');
    });
  });
});
