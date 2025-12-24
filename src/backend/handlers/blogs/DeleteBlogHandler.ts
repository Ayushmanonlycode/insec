import { NextRequest } from 'next/server';
import { BaseHandler } from '../BaseHandler';
import { BlogService } from '../../services/BlogService';
import { DrizzleBlogRepository } from '../../repositories/drizzle/DrizzleBlogRepository';
import { JWTService } from '../../utils/JWTService';

export class DeleteBlogHandler extends BaseHandler {
  private blogService: BlogService;

  constructor() {
    super();
    const repository = new DrizzleBlogRepository();
    this.blogService = new BlogService(repository);
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

      await this.blogService.deleteBlog(payload.id, params.id);
      return this.success({ message: 'Blog deleted successfully' }, 200, rateLimit);
    } catch (error: any) {
      return this.error(error.message || 'Failed to delete blog', 400, rateLimit);
    }
  }
}
