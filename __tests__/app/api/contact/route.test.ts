import { submitContactForm } from '@/app/actions/contact';
import { contactFormTelegramService } from '@/lib/services/telegram/ContactFormTelegramService';
import connectDB from '@/lib/db/mongodb';

// Mock dependencies
jest.mock('@/lib/db/mongodb', () => ({
  connectToDatabase: jest.fn(),
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@/lib/services/telegram/ContactFormTelegramService', () => ({
  contactFormTelegramService: {
    sendNotification: jest.fn(),
  },
}));

jest.mock('@/lib/utils/rate-limit', () => ({
  checkRateLimit: jest.fn(() => ({
    allowed: true,
    resetInSeconds: 0,
    remaining: 10,
  })),
  RATE_LIMITS: {
    FORM_SUBMISSION: { maxRequests: 10, windowSeconds: 60 },
  },
}));

// Mock Contact model
jest.mock('@/lib/db/models/contact', () => ({
  Contact: { create: jest.fn() },
}));
import { Contact } from '@/lib/db/models/contact';

// Mock next/headers
jest.mock('next/headers', () => ({
  headers: jest.fn(() => ({
    get: jest.fn((key: string) => {
      if (key === 'user-agent') return 'jest-test-agent';
      if (key === 'x-forwarded-for') return '127.0.0.1';
      return null;
    }),
  })),
}));

const mockCreate = Contact.create as jest.Mock;

import { checkRateLimit } from '@/lib/utils/rate-limit';
const mockCheckRateLimit = checkRateLimit as jest.Mock;

describe('submitContactForm action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (connectDB as jest.Mock).mockResolvedValue(true);
    (contactFormTelegramService.sendNotification as jest.Mock).mockResolvedValue(true);
    mockCreate.mockResolvedValue({ _id: 'new-id' });
    mockCheckRateLimit.mockReturnValue({ allowed: true, resetInSeconds: 0, remaining: 10 });
  });

  describe('validation', () => {
    it('should return validation error when required fields are missing', async () => {
      const result = await submitContactForm({ name: 'Test' });

      expect(result.success).toBe(false);
      expect(result.error).toBe('Validation failed');
    });

    it('should return validation error for invalid email', async () => {
      const result = await submitContactForm({
        name: 'Test User',
        email: 'not-an-email',
        subject: 'Hello',
        message: 'Hello there, this is a longer test message to meet validation.',
      });

      expect(result.success).toBe(false);
      expect(result.error).toBe('Validation failed');
    });
  });

  describe('rate limiting', () => {
    it('should return error when rate limit is exceeded', async () => {
      mockCheckRateLimit.mockReturnValue({ allowed: false, resetInSeconds: 30, remaining: 0 });

      const result = await submitContactForm({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Hello',
        message: 'Hello there, this is a longer test message to meet validation.',
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('Too many requests');
    });
  });

  describe('success', () => {
    it('should succeed on valid request', async () => {
      const result = await submitContactForm({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Hello',
        message: 'Hello there, this is a longer test message to meet validation.',
      });

      expect(result.success).toBe(true);
      expect(mockCreate).toHaveBeenCalled();
      expect(contactFormTelegramService.sendNotification).toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    it('should handle database errors gracefully', async () => {
      mockCreate.mockRejectedValue(new Error('DB Error'));

      const result = await submitContactForm({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Hello',
        message: 'Hello there, this is a longer test message to meet validation.',
      });

      expect(result.success).toBe(false);
      expect(result.error).toBe('Failed to submit contact form. Please try again later.');
    });
  });
});
