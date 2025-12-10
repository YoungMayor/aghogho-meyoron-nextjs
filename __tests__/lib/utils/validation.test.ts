import {
  isValidEmail,
  isValidPhone,
  isValidLength,
  validateContactForm,
  validateMentorshipForm,
  sanitizeInput,
} from '@/lib/utils/validation';

describe('Validation Utility Functions', () => {
  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('user+tag@example.com')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('invalid@')).toBe(false);
      expect(isValidEmail('@invalid.com')).toBe(false);
      expect(isValidEmail('invalid@domain')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidPhone', () => {
    it('should validate correct phone numbers', () => {
      expect(isValidPhone('+1234567890')).toBe(true);
      expect(isValidPhone('(555) 123-4567')).toBe(true);
      expect(isValidPhone('1234567890')).toBe(true);
    });

    it('should reject invalid phone numbers', () => {
      expect(isValidPhone('abc')).toBe(false);
      expect(isValidPhone('')).toBe(false);
    });
  });

  describe('isValidLength', () => {
    it('should pass when length is within range', () => {
      expect(isValidLength('test', 2, 10)).toBe(true);
      expect(isValidLength('hello', 5, 10)).toBe(true);
      expect(isValidLength('hi', 2, 5)).toBe(true);
    });

    it('should fail when length is outside range', () => {
      expect(isValidLength('hi', 3, 10)).toBe(false);
      expect(isValidLength('hello world', 1, 5)).toBe(false);
      expect(isValidLength('', 1, 10)).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isValidLength('  test  ', 2, 10)).toBe(true); // trims spaces
    });
  });

  describe('validateContactForm', () => {
    it('should pass validation for valid contact form', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'This is a test message that is long enough to pass validation',
      };

      const result = validateContactForm(validData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should fail validation for invalid name', () => {
      const invalidData = {
        name: 'J',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'This is a test message that is long enough to pass validation',
      };

      const result = validateContactForm(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.field === 'name')).toBe(true);
    });

    it('should fail validation for invalid email', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'invalid-email',
        subject: 'Test Subject',
        message: 'This is a test message that is long enough to pass validation',
      };

      const result = validateContactForm(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.field === 'email')).toBe(true);
    });

    it('should fail validation for short message', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Too short',
      };

      const result = validateContactForm(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.field === 'message')).toBe(true);
    });
  });

  describe('validateMentorshipForm', () => {
    it('should pass validation for valid mentorship form', () => {
      const validData = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1234567890',
        background: 'This is my background story. '.repeat(10),
        goals: 'These are my goals and expectations. '.repeat(10),
        commitment: '10 hours/week',
      };

      const result = validateMentorshipForm(validData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should pass validation without phone', () => {
      const validData = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        background: 'This is my background story. '.repeat(10),
        goals: 'These are my goals and expectations. '.repeat(10),
        commitment: '10 hours/week',
      };

      const result = validateMentorshipForm(validData);
      expect(result.isValid).toBe(true);
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

      const result = validateMentorshipForm(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.field === 'phone')).toBe(true);
    });

    it('should fail validation for short background', () => {
      const invalidData = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        background: 'Too short',
        goals: 'These are my goals and expectations. '.repeat(10),
        commitment: '10 hours/week',
      };

      const result = validateMentorshipForm(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors.some((e) => e.field === 'background')).toBe(true);
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
