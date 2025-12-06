import { GET } from '@/app/api/projects/route';
import { generateAuthToken } from '@/lib/utils/api-auth';

// Mock data
jest.mock('@/lib/data/projects', () => ({
  projects: [
    {
      id: 1,
      name: 'Project A',
      type: 'web',
      owner: 'me',
      show: true,
      priority: 1,
      technologies: [{ name: 'React' }, { name: 'Node' }],
    },
    {
      id: 2,
      name: 'Project B',
      type: 'mobile',
      owner: 'other',
      show: true,
      priority: 2,
      technologies: [{ name: 'Flutter' }],
    },
    {
      id: 3,
      name: 'Project C',
      type: 'web',
      owner: 'me',
      show: false,
      priority: 3,
      technologies: [{ name: 'Vue' }],
    },
  ],
}));

describe('Projects API', () => {
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
      const req = new Request('http://localhost/api/projects', {
        headers: {
          'X-Auth-Token': 'invalid-token',
        },
      });
      const res = await GET(req);
      const data = await res.json();

      expect(res.status).toBe(401);
      expect(data.error).toBe('Unauthorized');
    });

    it('should return all visible projects if no filters', async () => {
      const token = generateAuthToken(validSecret);
      const req = new Request('http://localhost/api/projects', {
        headers: {
          'X-Auth-Token': token,
        },
      });
      const res = await GET(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveLength(2); // Project C is hidden
      expect(data.pagination.total).toBe(2);
    });

    it('should filter by type', async () => {
      const token = generateAuthToken(validSecret);
      const req = new Request('http://localhost/api/projects?type=web', {
        headers: {
          'X-Auth-Token': token,
        },
      });
      const res = await GET(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.data).toHaveLength(1); // Only Project A (C is hidden)
      expect(data.data[0].name).toBe('Project A');
    });

    it('should filter by owner', async () => {
      const token = generateAuthToken(validSecret);
      const req = new Request('http://localhost/api/projects?owner=other', {
        headers: {
          'X-Auth-Token': token,
        },
      });
      const res = await GET(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.data).toHaveLength(1); // Only Project B
      expect(data.data[0].name).toBe('Project B');
    });

    it('should filter by technologies', async () => {
      const token = generateAuthToken(validSecret);
      const req = new Request('http://localhost/api/projects?technologies=react', {
        headers: {
          'X-Auth-Token': token,
        },
      });
      const res = await GET(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.data).toHaveLength(1);
      expect(data.data[0].name).toBe('Project A');
    });
  });
});
