import { NextRequest } from 'next/server';
import { BaseHandler } from '../BaseHandler';
import { BlogService } from '../../services/BlogService';
import { DrizzleBlogRepository } from '../../repositories/drizzle/DrizzleBlogRepository';
import { BlogValidator } from '../../validators/BlogValidator';
import { JWTService } from '../../utils/JWTService';
import { z } from 'zod';


export class UpdateBlogHandler extends BaseHandler {
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

      const body = await req.json();
      const validatedData = BlogValidator.updateBlogSchema.parse(body);
      const blog = await this.blogService.updateBlog(payload.id, params.id, validatedData as any);
      return this.success(blog, 200, rateLimit);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return this.error(error.issues[0].message, 400, rateLimit);
      }
      return this.error(error.message || 'Failed to update blog', 400, rateLimit);
    }
  }
}
