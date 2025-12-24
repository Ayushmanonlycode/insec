import { db } from '../../../lib/db';
import { blogs, users, Blog, NewBlog } from '../../../lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { IBlogRepository } from '../interfaces/IBlogRepository';

export class DrizzleBlogRepository implements IBlogRepository {
  async findAll(): Promise<(Blog & { author: { username: string } })[]> {
    const result = await db.select({
      blog: blogs,
      author: {
        username: users.username
      }
    })
    .from(blogs)
    .innerJoin(users, eq(blogs.authorId, users.id))
    .orderBy(desc(blogs.createdAt));

    return result.map((r: any) => ({
      ...r.blog,
      author: r.author
    }));
  }

  async findById(id: string): Promise<(Blog & { author: { username: string } }) | null> {
    const result = await db.select({
      blog: blogs,
      author: {
        username: users.username
      }
    })
    .from(blogs)
    .innerJoin(users, eq(blogs.authorId, users.id))
    .where(eq(blogs.id, id))
    .limit(1);

    if (result.length === 0) return null;
    return {
      ...result[0].blog,
      author: result[0].author
    };
  }

  async create(blog: NewBlog): Promise<Blog & { author: { username: string } }> {
    const result = await db.insert(blogs).values(blog).returning();
    const fullBlog = await this.findById(result[0].id);
    if (!fullBlog) throw new Error('Failed to retrieve created blog');
    return fullBlog;
  }

  async update(id: string, data: Partial<Blog>): Promise<Blog & { author: { username: string } }> {
    await db.update(blogs)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(blogs.id, id));
    
    const fullBlog = await this.findById(id);
    if (!fullBlog) throw new Error('Blog not found after update');
    return fullBlog;
  }

  async delete(id: string): Promise<void> {
    await db.delete(blogs).where(eq(blogs.id, id));
  }
}
