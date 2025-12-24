import { NextRequest } from 'next/server';
import { BaseHandler } from './BaseHandler';
import { DrizzleUserRepository } from '../repositories/DrizzleUserRepository';
import { JWTService } from '../utils/JWTService';

export class MeHandler extends BaseHandler {
  private userRepository: DrizzleUserRepository;

  constructor() {
    super();
    this.userRepository = new DrizzleUserRepository();
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

    const user = await this.userRepository.findById(payload.id);
    if (!user) {
      return this.error('User not found', 404);
    }

    return this.success({
      id: user.id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      avatarUrl: user.avatarUrl,
    });
  }
}
