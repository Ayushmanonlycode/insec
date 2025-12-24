import { NextRequest } from 'next/server';
import { BaseHandler } from './BaseHandler';
import { AuthService } from '../services/AuthService';
import { DrizzleUserRepository } from '../repositories/DrizzleUserRepository';

export class RefreshHandler extends BaseHandler {
  private authService: AuthService;

  constructor() {
    super();
    const userRepository = new DrizzleUserRepository();
    this.authService = new AuthService(userRepository);
  }

  async handle(req: NextRequest) {
    try {
      const refreshToken = req.cookies.get('refreshToken')?.value;

      if (!refreshToken) {
        return this.unauthorized('No refresh token provided');
      }

      const result = await this.authService.refresh(refreshToken);

      const response = this.success(result);
      
      response.cookies.set('accessToken', result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 15, // 15 minutes
        path: '/',
      });

      response.cookies.set('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return response;
    } catch (error: any) {
      return this.unauthorized(error.message || 'Refresh failed');
    }
  }
}
