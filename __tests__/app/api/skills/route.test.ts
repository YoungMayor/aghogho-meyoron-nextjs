import { GET } from '@/app/api/skills/route';
import { generateAuthToken } from '@/lib/utils/api-auth';

// Mock data
jest.mock('@/lib/data/skills', () => ({
  skills: [
    { name: 'React', category: 'Frontend', proficiency: 90, show: true },
    { name: 'Node.js', category: 'Backend', proficiency: 80, show: true },
    { name: 'Java', category: 'Backend', proficiency: 50, show: false },
  ],
  technicalSkills: [{ name: 'Tech A', show: true, priority: 1 }],
  softSkills: [{ name: 'Soft A', show: true, priority: 1 }],
}));

describe('Skills API', () => {
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
      const req = new Request('http://localhost/api/skills', {
        headers: {
          'X-Auth-Token': 'invalid-token',
        },
      });
      const res = await GET(req);
      const data = await res.json();

      expect(res.status).toBe(401);
      expect(data.error).toBe('Unauthorized');
    });

    it('should return all visible skills', async () => {
      const token = generateAuthToken(validSecret);
      const req = new Request('http://localhost/api/skills', {
        headers: {
          'X-Auth-Token': token,
        },
      });
      const res = await GET(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.all).toHaveLength(2); // Java is hidden
      expect(data.data.all.find((s: { name: string }) => s.name === 'React')).toBeDefined();
    });
  });
});
