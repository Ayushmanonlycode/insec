import { db } from '@/lib/db';
import { blogs, Blog, NewBlog } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { IBlogRepository } from './IBlogRepository';

export class DrizzleBlogRepository implements IBlogRepository {
  async findAll(): Promise<Blog[]> {
    return await db.select().from(blogs).orderBy(desc(blogs.createdAt));
  }

  async findById(id: string): Promise<Blog | null> {
    const result = await db.select().from(blogs).where(eq(blogs.id, id)).limit(1);
    return result[0] || null;
  }

  async create(blog: NewBlog): Promise<Blog> {
    const result = await db.insert(blogs).values(blog).returning();
    return result[0];
  }
}
