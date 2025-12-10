import { POST } from '@/app/api/contact/route';
import { generateAuthToken } from '@/lib/utils/api-auth';
import { sendTelegramNotification } from '@/lib/utils/telegram';
import connectDB from '@/lib/db/mongodb';

// Mock dependencies
jest.mock('@/lib/db/mongodb', () => ({
  connectToDatabase: jest.fn(),
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@/lib/utils/telegram', () => ({
  sendTelegramNotification: jest.fn(),
}));

jest.mock('@/lib/utils/rate-limit', () => ({
  checkRateLimit: jest.fn(() => ({
    allowed: true,
    resetInSeconds: 0,
    remaining: 10,
  })),
  getClientIp: jest.fn(() => '127.0.0.1'),
  RATE_LIMITS: {
    FORM_SUBMISSION: { maxRequests: 10, windowSeconds: 60 },
  },
}));

// Mock Contact model
jest.mock('@/lib/db/models/contact', () => ({
  Contact: { create: jest.fn() },
}));
import { Contact } from '@/lib/db/models/contact';

const mockCreate = Contact.create as jest.Mock;

describe('Contact API', () => {
  const validSecret = 'valid-secret';

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.INTERNAL_API_SECRET = validSecret;
    // const connect = require('@/lib/db/mongodb').default;
    (connectDB as jest.Mock).mockResolvedValue(true);
    (sendTelegramNotification as jest.Mock).mockResolvedValue(true);
    mockCreate.mockResolvedValue({ _id: 'new-id' });
  });

  afterEach(() => {
    delete process.env.INTERNAL_API_SECRET;
  });

  describe('POST', () => {
    it('should return 401 if unauthorized', async () => {
      const req = new Request('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
          'X-Auth-Token': 'invalid-token',
        },
      });
      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(401);
      expect(data.error).toBe('Unauthorized');
    });

    it('should return 422 if validation fails', async () => {
      const token = generateAuthToken(validSecret);
      // Missing required fields
      const req = new Request('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify({ name: 'Test' }),
        headers: {
          'X-Auth-Token': token,
        },
      });
      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(422);
      expect(data.error).toBe('Validation error');
    });

    it('should success on valid request', async () => {
      const token = generateAuthToken(validSecret);
      const body = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Hello',
        message: 'Hello there, this is a longer test message to meet validation.',
        recaptchaToken: 'valid-token',
      };
      const req = new Request('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'X-Auth-Token': token,
        },
      });

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
      expect(mockCreate).toHaveBeenCalled();
      expect(sendTelegramNotification).toHaveBeenCalled();
    });

    it('should handle database errors gracefully', async () => {
      const token = generateAuthToken(validSecret);
      mockCreate.mockRejectedValue(new Error('DB Error'));
      const body = {
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Hello',
        message: 'Hello there, this is a longer test message to meet validation.',
        recaptchaToken: 'valid-token',
      };
      const req = new Request('http://localhost/api/contact', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'X-Auth-Token': token,
        },
      });

      const res = await POST(req);
      const data = await res.json();

      expect(res.status).toBe(500);
      expect(data.error).toBe('Failed to submit contact form');
    });
  });
});
