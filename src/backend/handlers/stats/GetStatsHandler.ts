import { NextRequest } from 'next/server';
import { BaseHandler } from '../BaseHandler';
import { db } from '@/lib/db';
import { issues, blogs } from '@/lib/db/schema';
import { eq, sql, and, gte } from 'drizzle-orm';
import { JWTService } from '../../utils/JWTService';

export class GetStatsHandler extends BaseHandler {
  constructor() {
    super();
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

      const userId = payload.id;

      // 1. Distribution data
      const distribution = await db
        .select({
          type: issues.type,
          value: sql<number>`count(*)`.mapWith(Number),
        })
        .from(issues)
        .where(eq(issues.userId, userId))
        .groupBy(issues.type);

      // 2. Trend data (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
      sevenDaysAgo.setHours(0, 0, 0, 0);

      const trend = await db
        .select({
          date: sql<string>`DATE(created_at)`,
          count: sql<number>`count(*)`.mapWith(Number),
        })
        .from(issues)
        .where(
            and(
                eq(issues.userId, userId),
                gte(issues.createdAt, sevenDaysAgo)
            )
        )
        .groupBy(sql`DATE(created_at)`)
        .orderBy(sql`DATE(created_at)`);

      // 3. Core Health
      const [totalIssues] = await db
        .select({ count: sql<number>`count(*)`.mapWith(Number) })
        .from(issues)
        .where(eq(issues.userId, userId));

      const [resolvedIssues] = await db
        .select({ count: sql<number>`count(*)`.mapWith(Number) })
        .from(issues)
        .where(and(eq(issues.userId, userId), eq(issues.status, 'Resolved')));

      const [totalBlogs] = await db
        .select({ count: sql<number>`count(*)`.mapWith(Number) })
        .from(blogs)
        .where(eq(blogs.authorId, userId));

      return this.success({
        distribution,
        trend,
        summary: {
          totalIssues: totalIssues?.count || 0,
          resolvedIssues: resolvedIssues?.count || 0,
          totalDirectives: totalBlogs?.count || 0,
          nodeIntegrity: 99.98, // Keep this high-tech mock for now
          latency: '9.2 ms' // Keep this high-tech mock for now
        }
      }, 200, rateLimit);

    } catch (error: any) {
      return this.error(error.message || 'Failed to fetch statistics', 400, rateLimit);
    }
  }
}
