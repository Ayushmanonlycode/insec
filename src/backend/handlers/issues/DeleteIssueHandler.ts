import { NextRequest } from 'next/server';
import { BaseHandler } from '../BaseHandler';
import { IssueService } from '../../services/IssueService';
import { DrizzleIssueRepository } from '../../repositories/drizzle/DrizzleIssueRepository';
import { JWTService } from '../../utils/JWTService';

export class DeleteIssueHandler extends BaseHandler {
  private issueService: IssueService;

  constructor() {
    super();
    const repository = new DrizzleIssueRepository();
    this.issueService = new IssueService(repository);
  }

  async handle(req: NextRequest, { params }: { params: { id: string } }) {
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

      await this.issueService.deleteIssue(params.id, payload.id);
      return this.success({ message: 'Issue deleted successfully' }, 200, rateLimit);
    } catch (error: any) {
      return this.error(error.message || 'Failed to delete issue', 400, rateLimit);
    }
  }
}
