import { GET } from '@/app/api/history/route';
import { generateAuthToken } from '@/lib/utils/api-auth';

// Mock dependencies
jest.mock('@/lib/data/academic_history', () => ({
  academicRecords: [{ id: 1, institution: 'School A', show: true, start_year: '2020' }],
}));

jest.mock('@/lib/data/career_history', () => ({
  careerItems: [{ id: 2, company: 'Company A', show: true, start_date: '2023-01-01' }],
}));

describe('History API', () => {
  const validSecret = 'valid-secret';

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.INTERNAL_API_SECRET = validSecret;
  });

  afterEach(() => {
    delete process.env.INTERNAL_API_SECRET;
  });

  describe('GET', () => {
    it('should return 401 if unauthorized', async () => {
      const req = new Request('http://localhost/api/history', {
        headers: {
          'X-Auth-Token': 'invalid-token',
        },
      });
      const res = await GET(req);
      const data = await res.json();

      expect(res.status).toBe(401);
      expect(data.error).toBe('Unauthorized');
    });

    it('should return all history if no type specified', async () => {
      const token = generateAuthToken(validSecret);
      const req = new Request('http://localhost/api/history', {
        headers: {
          'X-Auth-Token': token,
        },
      });
      const res = await GET(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.academic).toHaveLength(1);
      expect(data.data.career).toHaveLength(1);
    });

    it('should filter by career', async () => {
      const token = generateAuthToken(validSecret);
      const req = new Request('http://localhost/api/history?type=career', {
        headers: {
          'X-Auth-Token': token,
        },
      });
      const res = await GET(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.data).toHaveLength(1);
      expect(data.data[0].company).toBe('Company A');
    });

    it('should filter by academic', async () => {
      const token = generateAuthToken(validSecret);
      const req = new Request('http://localhost/api/history?type=academic', {
        headers: {
          'X-Auth-Token': token,
        },
      });
      const res = await GET(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.data).toHaveLength(1);
      expect(data.data[0].institution).toBe('School A');
    });
  });
});
