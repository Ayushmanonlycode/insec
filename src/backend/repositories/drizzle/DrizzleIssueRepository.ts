import { db } from '../../../lib/db';
import { issues, users, Issue, NewIssue, UpdateIssue } from '../../../lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { IIssueRepository } from '../interfaces/IIssueRepository';

export class DrizzleIssueRepository implements IIssueRepository {
  async findById(id: string): Promise<Issue | null> {
    const result = await db.select().from(issues).where(eq(issues.id, id)).limit(1);
    return result[0] || null;
  }

  async findAll(userId: string, filters?: { type?: any }): Promise<Issue[]> {
    let query = db.select().from(issues).where(eq(issues.userId, userId));
    
    if (filters?.type) {
      // Drizzle handles enum comparison
      query = db.select().from(issues).where(
        and(
          eq(issues.userId, userId),
          eq(issues.type, filters.type)
        )
      );
    }
    
    return await query;
  }

  async create(issue: NewIssue): Promise<Issue> {
    const result = await db.insert(issues).values(issue).returning();
    return result[0];
  }

  async update(id: string, issue: UpdateIssue): Promise<Issue> {
    const result = await db
      .update(issues)
      .set({ ...issue, updatedAt: new Date() })
      .where(eq(issues.id, id))
      .returning();
    return result[0];
  }

  async delete(id: string): Promise<void> {
    await db.delete(issues).where(eq(issues.id, id));
  }

  async isOwner(issueId: string, userId: string): Promise<boolean> {
    const result = await db
      .select({ id: issues.id })
      .from(issues)
      .where(and(eq(issues.id, issueId), eq(issues.userId, userId)))
      .limit(1);
    return result.length > 0;
  }
}
