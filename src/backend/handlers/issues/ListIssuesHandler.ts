import { NextRequest } from 'next/server';
import { BaseHandler } from '../BaseHandler';
import { IssueService } from '../../services/IssueService';
import { DrizzleIssueRepository } from '../../repositories/drizzle/DrizzleIssueRepository';
import { JWTService } from '../../utils/JWTService';

export class ListIssuesHandler extends BaseHandler {
  private issueService: IssueService;

  constructor() {
    super();
    const repository = new DrizzleIssueRepository();
    this.issueService = new IssueService(repository);
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

      const { searchParams } = new URL(req.url);
      const rawType = searchParams.get('type');
      
      let type: string | undefined = undefined;
      if (rawType) {
        const mapping: Record<string, string> = {
          'cloud-security': 'Cloud Security',
          'redteam-assessment': 'Redteam Assessment',
          'vapt': 'VAPT',
          'cloud security': 'Cloud Security',
          'redteam assessment': 'Redteam Assessment'
        };
        type = mapping[rawType.toLowerCase()] || rawType;
      }

      const issues = await this.issueService.getAllIssues(payload.id, type);
      return this.success(issues, 200, rateLimit);
    } catch (error: any) {
      return this.error(error.message || 'Failed to fetch issues', 400, rateLimit);
    }
  }
}
