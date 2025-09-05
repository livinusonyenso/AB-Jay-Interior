import { z } from 'zod';

export const createQuoteSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name too long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(20, 'Phone number too long'),
  location: z.string().min(1, 'Location is required').max(100, 'Location too long'),
  projectType: z.string().min(1, 'Project type is required').max(100, 'Project type too long'),
  budget: z.string().min(1, 'Budget range is required'),
  timeline: z.string().min(1, 'Timeline is required'),
  description: z.string().min(20, 'Description must be at least 20 characters').max(2000, 'Description too long'),
  hasPlans: z.boolean().default(false),
  newsletter: z.boolean().default(false),
});

export const quoteQuerySchema = z.object({
  page: z.string().transform(Number).pipe(z.number().min(1)).optional(),
  limit: z.string().transform(Number).pipe(z.number().min(1).max(100)).optional(),
  status: z.enum(['new', 'read', 'archived']).optional(),
});

export type CreateQuoteInput = z.infer<typeof createQuoteSchema>;
export type QuoteQueryInput = z.infer<typeof quoteQuerySchema>;