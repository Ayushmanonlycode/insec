import { NextRequest } from 'next/server';
import { BaseHandler } from '../BaseHandler';
import { BlogService } from '../../services/BlogService';
import { DrizzleBlogRepository } from '../../repositories/DrizzleBlogRepository';
import { JWTService } from '../../utils/JWTService';

export class ListBlogsHandler extends BaseHandler {
  private blogService: BlogService;

  constructor() {
    super();
    const blogRepository = new DrizzleBlogRepository();
    this.blogService = new BlogService(blogRepository);
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

      try {
        JWTService.verifyAccessToken(accessToken);
      } catch (jwtError: any) {
        return this.unauthorized(jwtError.message);
      }

      const blogs = await this.blogService.getAllBlogs();
      return this.success(blogs, 200, rateLimit);
    } catch (error: any) {
      return this.error(error.message || 'Failed to fetch blogs', 400, rateLimit);
    }
  }
}
