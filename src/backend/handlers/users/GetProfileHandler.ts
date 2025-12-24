import { NextRequest } from 'next/server';
import { BaseHandler } from '../BaseHandler';
import { UserService } from '../../services/UserService';
import { DrizzleUserRepository } from '../../repositories/drizzle/DrizzleUserRepository';
import { JWTService } from '../../utils/JWTService';

export class GetProfileHandler extends BaseHandler {
  private userService: UserService;

  constructor() {
    super();
    const userRepository = new DrizzleUserRepository();
    this.userService = new UserService(userRepository);
  }

  async handle(req: NextRequest) {
    const ip = this.getClientIp(req);
    const rateLimit = this.rateLimiter.check(ip, 100, 15 * 60 * 1000);
    if (rateLimit.isExceeded) {
      return this.tooManyRequests('Too many requests', rateLimit);
    }

    try {
      const accessToken = this.getAccessToken(req);
      if (!accessToken) return this.unauthorized('No access token provided');

      let payload;
      try {
        payload = JWTService.verifyAccessToken(accessToken);
      } catch (jwtError: any) {
        return this.unauthorized(jwtError.message);
      }

      const profile = await this.userService.getProfile(payload.id);
      return this.success(profile, 200, rateLimit);
    } catch (error: any) {
      return this.error(error.message || 'Failed to fetch profile', 400, rateLimit);
    }
  }
}
