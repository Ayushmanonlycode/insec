import { NextRequest } from 'next/server';
import { BaseHandler } from './BaseHandler';

export class LogoutHandler extends BaseHandler {
  async handle(req: NextRequest) {
    const response = this.success({ message: 'Logged out successfully' });
    
    // Clear cookies
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');

    return response;
  }
}
