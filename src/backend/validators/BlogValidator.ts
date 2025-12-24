import { z } from 'zod';

export class BlogValidator {
  static createBlogSchema = z.object({
    title: z.string().trim().min(3).max(255),
    content: z.string().trim().min(10),
  });

  static updateBlogSchema = z.object({
    title: z.string().trim().min(3).max(255).optional(),
    content: z.string().trim().min(10).optional(),
  });
}
