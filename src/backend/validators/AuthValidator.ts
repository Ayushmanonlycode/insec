import { z } from 'zod';

export class AuthValidator {
  static loginSchema = z.object({
    email: z.string().email().trim().toLowerCase(),
    password: z.string(),
  });

  static registerSchema = z.object({
    email: z.string().email().trim().toLowerCase(),
    username: z.string().min(3).max(50).trim(),
    password: z.string().min(8),
    fullName: z.string().trim().optional(),
  });

  static updateProfileSchema = z.object({
    fullName: z.string().trim().min(2).max(100).optional(),
    username: z.string().trim().min(3).max(50).toLowerCase().optional(),
    email: z.string().email().trim().toLowerCase().optional(),
  });
}
