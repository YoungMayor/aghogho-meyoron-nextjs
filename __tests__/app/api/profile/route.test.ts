import { GET } from '@/app/api/profile/route';
import { generateAuthToken } from '@/lib/utils/api-auth';

// Mock all data dependencies
jest.mock('@/lib/data/profile', () => ({
  profile: { name: 'Test User' },
}));
jest.mock('@/lib/data/academic_history', () => ({ academicRecords: [] }));
jest.mock('@/lib/data/career_history', () => ({ careerItems: [] }));
jest.mock('@/lib/data/projects', () => ({ projects: [] }));
jest.mock('@/lib/data/skills', () => ({
  skills: [],
  technicalSkills: [],
  softSkills: [],
}));
jest.mock('@/lib/data/articles', () => ({ articles: [] }));
jest.mock('@/lib/data/testimonials', () => ({ testimonials: [] }));
jest.mock('@/lib/data/social_links', () => ({ socialLinks: [] }));
jest.mock('@/lib/data/hobbies', () => ({ hobbies: [] }));
jest.mock('@/lib/data/badges', () => ({ badges: [] }));

describe('Profile API', () => {
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
      const req = new Request('http://localhost/api/profile', {
        headers: {
          'X-Auth-Token': 'invalid-token',
        },
      });
      const res = await GET(req);
      const data = await res.json();

      expect(res.status).toBe(401);
      expect(data.error).toBe('Unauthorized');
    });

    it('should return complete profile', async () => {
      const token = generateAuthToken(validSecret);
      const req = new Request('http://localhost/api/profile', {
        headers: {
          'X-Auth-Token': token,
        },
      });
      const res = await GET(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.name).toBe('Test User');
      expect(data.data.history).toBeDefined();
      expect(data.data.portfolio).toBeDefined();
    });
  });
});
