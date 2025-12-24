import { NextRequest } from 'next/server';
import { BaseHandler } from '../BaseHandler';
import { UserService } from '../../services/UserService';
import { DrizzleUserRepository } from '../../repositories/drizzle/DrizzleUserRepository';
import { JWTService } from '../../utils/JWTService';

export class MeHandler extends BaseHandler {
  private userService: UserService;

  constructor() {
    super();
    const userRepository = new DrizzleUserRepository();
    this.userService = new UserService(userRepository);
  }

  async handle(req: NextRequest) {
    const accessToken = req.cookies.get('accessToken')?.value;

    if (!accessToken) {
      return this.unauthorized();
    }

    const payload = JWTService.verifyAccessToken(accessToken);
    if (!payload) {
      return this.unauthorized('Invalid or expired token');
    }

    try {
      const user = await this.userService.getProfile(payload.id);
      return this.success(user);
    } catch (error: any) {
      return this.error(error.message || 'User not found', 404);
    }
  }
}
