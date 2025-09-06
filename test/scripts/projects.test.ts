import request from 'supertest';
import app from '../app';
import { Admin } from '../models/Admin';
import { Project } from '../models/Project';
import { hashPassword } from '../utils/password';

describe('Projects Endpoints', () => {
  let adminToken: string;

  beforeEach(async () => {
    // Create test admin and get token
    const passwordHash = await hashPassword('password123');
    await Admin.create({
      email: 'admin@test.com',
      passwordHash,
      name: 'Test Admin',
      role: 'admin',
    });

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'password123',
      });
    adminToken = loginResponse.body.token;

    // Create test projects
    await Project.create([
      {
        title: 'Modern House Renovation',
        location: 'San Francisco, CA',
        category: 'Residential',
        description: 'Complete modern renovation of a Victorian house with sustainable materials and smart home integration.',
        imageUrl: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      },
      {
        title: 'Office Complex Design',
        location: 'Austin, TX',
        category: 'Commercial',
        description: 'Contemporary office building design focusing on employee wellness and productivity.',
        imageUrl: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg',
      },
    ]);
  });

  describe('GET /api/projects', () => {
    it('should return all projects', async () => {
      const response = await request(app).get('/api/projects');

      expect(response.status).toBe(200);
      expect(response.body.projects).toHaveLength(2);
      expect(response.body.pagination.total).toBe(2);
    });

    it('should filter projects by category', async () => {
      const response = await request(app)
        .get('/api/projects')
        .query({ category: 'Residential' });

      expect(response.status).toBe(200);
      expect(response.body.projects).toHaveLength(1);
      expect(response.body.projects[0].category).toBe('Residential');
    });
  });

  describe('POST /api/projects', () => {
    it('should create project with valid data', async () => {
      const projectData = {
        title: 'New Project',
        location: 'New York, NY',
        category: 'Residential',
        description: 'This is a test project with sufficient description length to meet validation requirements.',
        imageUrl: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      };

      const response = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(projectData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.project.title).toBe(projectData.title);
    });

    it('should reject unauthenticated requests', async () => {
      const response = await request(app)
        .post('/api/projects')
        .send({
          title: 'Test Project',
          location: 'Test Location',
          category: 'Test Category',
          description: 'Test description that is long enough to pass validation requirements.',
        });

      expect(response.status).toBe(401);
    });
  });
});