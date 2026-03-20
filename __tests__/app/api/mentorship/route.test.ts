import { submitMentorshipForm } from '@/app/actions/mentorship';
import { mentorshipFormTelegramService } from '@/lib/services/telegram/MentorshipFormTelegramService';
import connectDB from '@/lib/db/mongodb';

// Mock dependencies
jest.mock('@/lib/db/mongodb', () => ({
  connectToDatabase: jest.fn(),
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@/lib/services/telegram/MentorshipFormTelegramService', () => ({
  mentorshipFormTelegramService: {
    sendNotification: jest.fn(),
  },
}));

// Mock MentorshipApplication model
jest.mock('@/lib/db/models/mentorship_application', () => ({
  MentorshipApplication: { create: jest.fn() },
}));
import { MentorshipApplication } from '@/lib/db/models/mentorship_application';

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

const mockCreate = MentorshipApplication.create as jest.Mock;

const validBody = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '+1234567890',
  background:
    'I have been a developer for 5 years working with React and Node.js. I am looking to improve my skills in backend architecture and system design.',
  goals:
    'I want to become a solution architect and learn how to build scalable distributed systems. I also want to improve my leadership skills.',
  commitment: 'High',
};

describe('submitMentorshipForm action', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (connectDB as jest.Mock).mockResolvedValue(true);
    (mentorshipFormTelegramService.sendNotification as jest.Mock).mockResolvedValue(true);
    mockCreate.mockResolvedValue({ _id: 'new-id' });
  });

  describe('validation', () => {
    it('should return validation error when required fields are missing', async () => {
      const result = await submitMentorshipForm({ name: 'Test' });

      expect(result.success).toBe(false);
      expect(result.error).toBe('Validation failed');
    });

    it('should return validation error for invalid email', async () => {
      const result = await submitMentorshipForm({ ...validBody, email: 'not-an-email' });

      expect(result.success).toBe(false);
      expect(result.error).toBe('Validation failed');
    });
  });

  describe('success', () => {
    it('should succeed on valid request', async () => {
      const result = await submitMentorshipForm(validBody);

      expect(result.success).toBe(true);
      expect(mockCreate).toHaveBeenCalled();
      expect(mentorshipFormTelegramService.sendNotification).toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    it('should handle database errors gracefully', async () => {
      mockCreate.mockRejectedValue(new Error('DB Error'));

      const result = await submitMentorshipForm(validBody);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Failed to submit application. Please try again later.');
    });
  });
});
