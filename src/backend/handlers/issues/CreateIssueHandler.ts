import { NextRequest } from 'next/server';
import { BaseHandler } from '../BaseHandler';
import { IssueService } from '../../services/IssueService';
import { EmailService } from '../../services/EmailService';
import { DrizzleIssueRepository } from '../../repositories/drizzle/DrizzleIssueRepository';
import { DrizzleUserRepository } from '../../repositories/drizzle/DrizzleUserRepository';
import { IssueValidator } from '../../validators/IssueValidator';
import { JWTService } from '../../utils/JWTService';
import { z } from 'zod';


export class CreateIssueHandler extends BaseHandler {
  private issueService: IssueService;
  private emailService: EmailService;
  private userRepository: DrizzleUserRepository;

  constructor() {
    super();
    const repository = new DrizzleIssueRepository();
    this.issueService = new IssueService(repository);
    this.emailService = new EmailService();
    this.userRepository = new DrizzleUserRepository();
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
      const validatedData = IssueValidator.createIssueSchema.parse(body);

      const issue = await this.issueService.createIssue(payload.id, validatedData as any);
      
      // Fire and forget notification
      this.userRepository.findById(payload.id).then(user => {
        if (user) {
          this.emailService.sendIssueNotification(user.email, {
            type: validatedData.type,
            title: validatedData.title,
            description: validatedData.description
          });
        }
      });

      return this.success(issue, 201, rateLimit);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return this.error(error.issues[0].message, 400, rateLimit);
      }
      return this.error(error.message || 'Failed to create issue', 400, rateLimit);
    }
  }
}
