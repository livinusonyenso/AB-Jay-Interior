import { z } from 'zod';

export const createProjectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  location: z.string().min(1, 'Location is required').max(100, 'Location too long'),
  category: z.string().min(1, 'Category is required').max(50, 'Category too long'),
  imageUrl: z.string().url('Invalid image URL').optional(),
  description: z.string().min(20, 'Description must be at least 20 characters').max(2000, 'Description too long'),
});

export const updateProjectSchema = createProjectSchema.partial();

export const projectQuerySchema = z.object({
  page: z.string().transform(Number).pipe(z.number().min(1)).optional(),
  limit: z.string().transform(Number).pipe(z.number().min(1).max(100)).optional(),
  category: z.string().optional(),
  location: z.string().optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type ProjectQueryInput = z.infer<typeof projectQuerySchema>;