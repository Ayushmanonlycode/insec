import { NextRequest } from 'next/server';
import { BaseHandler } from './BaseHandler';
import { AuthService } from '../services/AuthService';
import { DrizzleUserRepository } from '../repositories/DrizzleUserRepository';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export class LoginHandler extends BaseHandler {
  private authService: AuthService;

  constructor() {
    super();
    const userRepository = new DrizzleUserRepository();
    this.authService = new AuthService(userRepository);
  }

  async handle(req: NextRequest) {
    try {
      const body = await req.json();
      const { email, password } = loginSchema.parse(body);

      const result = await this.authService.login(email, password);

      const response = this.success(result);
      
      response.cookies.set('accessToken', result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 15,
        path: '/',
      });

      response.cookies.set('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });

      return response;
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return this.error(error.issues[0].message, 400);
      }
      return this.error(error.message || 'Login failed', 401);
    }
  }
}
