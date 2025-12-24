import { NextRequest } from 'next/server';
import { BaseHandler } from '../BaseHandler';
import { UserService } from '../../services/UserService';
import { EmailService } from '../../services/EmailService';
import { DrizzleUserRepository } from '../../repositories/DrizzleUserRepository';
import { JWTService } from '../../utils/JWTService';
import { z } from 'zod';

const updateProfileSchema = z.object({
  fullName: z.string().trim().min(2).max(100).optional(),
  username: z.string().trim().min(3).max(50).toLowerCase().optional(),
  email: z.string().email().trim().toLowerCase().optional(),
});

export class UpdateProfileHandler extends BaseHandler {
  private userService: UserService;
  private emailService: EmailService;
  private userRepository: DrizzleUserRepository;

  constructor() {
    super();
    this.userRepository = new DrizzleUserRepository();
    this.userService = new UserService(this.userRepository);
    this.emailService = new EmailService();
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

      const body = await req.json();
      const validatedData = updateProfileSchema.parse(body);

      if (Object.keys(validatedData).length === 0) {
        return this.error('No update data provided', 400, rateLimit);
      }

      const updatedProfile = await this.userService.updateProfile(payload.id, validatedData);

      // Fire and forget notification
      this.userRepository.findById(payload.id).then(user => {
        if (user) {
          this.emailService.sendProfileUpdateNotification(user.email);
        }
      });

      return this.success(updatedProfile, 200, rateLimit);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return this.error(error.issues[0].message, 400, rateLimit);
      }
      return this.error(error.message || 'Failed to update profile', 400, rateLimit);
    }
  }
}
