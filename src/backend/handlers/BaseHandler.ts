import { NextResponse, NextRequest } from 'next/server';
import { RateLimiter, RateLimitResult } from '../utils/RateLimiter';

export abstract class BaseHandler {
  protected rateLimiter = RateLimiter.getInstance();

  protected success(data: any, status = 200, rateLimit?: RateLimitResult) {
    const response = NextResponse.json({ success: true, data }, { status });
    if (rateLimit) this.setRateLimitHeaders(response, rateLimit);
    return response;
  }

  protected error(message: string, status = 400, rateLimit?: RateLimitResult) {
    const response = NextResponse.json({ success: false, message }, { status });
    if (rateLimit) this.setRateLimitHeaders(response, rateLimit);
    return response;
  }

  protected tooManyRequests(message = 'Too many requests', rateLimit?: RateLimitResult) {
    return this.error(message, 429, rateLimit);
  }

  protected unauthorized(message = 'Unauthorized') {
    return this.error(message, 401);
  }

  protected internalError(message = 'Internal Server Error') {
    return this.error(message, 500);
  }

  private setRateLimitHeaders(response: NextResponse, rateLimit: RateLimitResult) {
    response.headers.set('X-RateLimit-Limit', rateLimit.limit.toString());
    response.headers.set('X-RateLimit-Remaining', rateLimit.remaining.toString());
    response.headers.set('X-RateLimit-Reset', rateLimit.reset.toString());
  }

  protected getClientIp(req: NextRequest): string {
    const forwardedFor = req.headers.get('x-forwarded-for');
    if (forwardedFor) return forwardedFor.split(',')[0].trim();
    return '127.0.0.1'; // Fallback
  }

  protected getAccessToken(req: NextRequest): string | undefined {
    // 1. Try Cookie
    const cookieToken = req.cookies.get('accessToken')?.value;
    if (cookieToken) return cookieToken;

    // 2. Try Authorization Header
    const authHeader = req.headers.get('Authorization');
    if (authHeader?.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }

    return undefined;
  }
}
