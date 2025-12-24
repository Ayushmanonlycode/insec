import { NextRequest } from 'next/server';
import { BaseHandler } from '../BaseHandler';
import { IssueService } from '../../services/IssueService';
import { DrizzleIssueRepository } from '../../repositories/DrizzleIssueRepository';
import { JWTService } from '../../utils/JWTService';
import { z } from 'zod';

const updateIssueSchema = z.object({
  type: z.enum(['Cloud Security', 'Redteam Assessment', 'VAPT']).optional(),
  title: z.string().min(5).max(255).trim().optional(),
  description: z.string().min(10).trim().optional(),
  priority: z.enum(['Low', 'Medium', 'High', 'Critical']).optional(),
  status: z.enum(['Open', 'In Progress', 'Resolved', 'Closed']).optional(),
});

export class UpdateIssueHandler extends BaseHandler {
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

      const body = await req.json();
      const validatedData = updateIssueSchema.parse(body);

      const issue = await this.issueService.updateIssue(params.id, payload.id, validatedData as any);
      return this.success(issue, 200, rateLimit);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return this.error(error.issues[0].message, 400, rateLimit);
      }
      return this.error(error.message || 'Failed to update issue', 400, rateLimit);
    }
  }
}
