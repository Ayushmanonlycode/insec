import { NextRequest } from 'next/server';
import { BaseHandler } from './BaseHandler';
import { AuthService } from '../services/AuthService';
import { EmailService } from '../services/EmailService';
import { DrizzleUserRepository } from '../repositories/DrizzleUserRepository';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  username: z.string().min(3).max(50).trim(),
  password: z.string().min(8),
  fullName: z.string().trim().optional(),
});

export class RegisterHandler extends BaseHandler {
  private authService: AuthService;
  private emailService: EmailService;

  constructor() {
    super();
    const userRepository = new DrizzleUserRepository();
    this.authService = new AuthService(userRepository);
    this.emailService = new EmailService();
  }

  async handle(req: NextRequest) {
    try {
      const body = await req.json();
      const validatedData = registerSchema.parse(body);

      const result = await this.authService.register(validatedData);
      
      // Fire and forget welcome email
      this.emailService.sendWelcomeEmail(result.user.email, result.user.username);

      const response = this.success(result, 201);
      
      // Set access token in cookie
      response.cookies.set('accessToken', result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 15, // 15 minutes
        path: '/',
      });

      // Set refresh token in cookie
      response.cookies.set('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return response;
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return this.error(error.issues[0].message, 400);
      }
      return this.error(error.message || 'Registration failed', 400);
    }
  }
}
