import request from 'supertest';
import app from '../app';
import { Quote } from '../models/Quote';

describe('Quotes Endpoints', () => {
  describe('POST /api/quotes', () => {
    it('should create quote with valid data', async () => {
      const quoteData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        location: 'San Francisco, CA',
        projectType: 'House Renovation',
        budget: '$50,000 - $100,000',
        timeline: '3-6 months',
        description: 'I need help renovating my kitchen and bathroom. Looking for modern design with quality materials.',
        hasPlans: false,
        newsletter: true,
      };

      const response = await request(app)
        .post('/api/quotes')
        .send(quoteData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.quoteId).toBeDefined();

      // Verify quote was saved to database
      const savedQuote = await Quote.findById(response.body.quoteId);
      expect(savedQuote?.email).toBe(quoteData.email);
    });

    it('should reject invalid email', async () => {
      const response = await request(app)
        .post('/api/quotes')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'invalid-email',
          phone: '1234567890',
          location: 'San Francisco, CA',
          projectType: 'House Renovation',
          budget: '$50,000 - $100,000',
          timeline: '3-6 months',
          description: 'Test description that meets minimum length requirements.',
          hasPlans: false,
          newsletter: false,
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation failed');
    });

    it('should reject short description', async () => {
      const response = await request(app)
        .post('/api/quotes')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phone: '1234567890',
          location: 'San Francisco, CA',
          projectType: 'House Renovation',
          budget: '$50,000 - $100,000',
          timeline: '3-6 months',
          description: 'Too short',
          hasPlans: false,
          newsletter: false,
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation failed');
    });
  });
});