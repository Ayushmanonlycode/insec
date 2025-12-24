import { NextRequest } from 'next/server';
import { BaseHandler } from '../BaseHandler';
import { BlogService } from '../../services/BlogService';
import { DrizzleBlogRepository } from '../../repositories/drizzle/DrizzleBlogRepository';
import { BlogValidator } from '../../validators/BlogValidator';
import { JWTService } from '../../utils/JWTService';
import { z } from 'zod';

export class CreateBlogHandler extends BaseHandler {
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

      let payload;
      try {
        payload = JWTService.verifyAccessToken(accessToken);
      } catch (jwtError: any) {
        return this.unauthorized(jwtError.message);
      }

      const body = await req.json();
      const validatedData = BlogValidator.createBlogSchema.parse(body);

      const blog = await this.blogService.createBlog(payload.id, validatedData);
      return this.success(blog, 201, rateLimit);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return this.error(error.issues[0].message, 400, rateLimit);
      }
      return this.error(error.message || 'Failed to create blog', 400, rateLimit);
    }
  }
}
