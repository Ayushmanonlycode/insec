import { IBlogRepository } from '../repositories/interfaces/IBlogRepository';
import { Blog, NewBlog } from '@/lib/db/schema';
import { CacheService } from '../utils/CacheService';

export class BlogService {
  private readonly CACHE_TTL = 300; // 5 minutes

  constructor(private blogRepository: IBlogRepository) {}

  async getAllBlogs(): Promise<(Blog & { author: { username: string } })[]> {
    const cacheKey = 'blogs:all';
    const cachedBlogs = CacheService.get<(Blog & { author: { username: string } })[]>(cacheKey);
    
    if (cachedBlogs) {
      return cachedBlogs;
    }

    const blogs = await this.blogRepository.findAll();
    CacheService.set(cacheKey, blogs, this.CACHE_TTL);
    return blogs;
  }

  async createBlog(authorId: string, data: { title: string; content: string }): Promise<Blog & { author: { username: string } }> {
    if (!data.title || data.title.trim().length === 0) {
      throw new Error('Title is required');
    }
    if (!data.content || data.content.trim().length === 0) {
      throw new Error('Content is required');
    }

    const newBlog: NewBlog = {
      authorId,
      title: data.title,
      content: data.content,
    };

    const blog = await this.blogRepository.create(newBlog);
    CacheService.delete('blogs:all');
    return blog;
  }

  async updateBlog(userId: string, blogId: string, data: Partial<Blog>): Promise<Blog & { author: { username: string } }> {
    const blog = await this.blogRepository.findById(blogId);
    if (!blog) throw new Error('Blog not found');
    
    if (blog.authorId.toLowerCase() !== userId.toLowerCase()) {
      throw new Error('Unauthorized: Access Denied');
    }

    const updated = await this.blogRepository.update(blogId, data);
    CacheService.delete('blogs:all');
    CacheService.delete(`blog:${blogId}`);
    return updated;
  }

  async deleteBlog(userId: string, blogId: string): Promise<void> {
    const blog = await this.blogRepository.findById(blogId);
    if (!blog) throw new Error('Blog not found');
    
    if (blog.authorId.toLowerCase() !== userId.toLowerCase()) {
      throw new Error('Unauthorized: Access Denied');
    }

    await this.blogRepository.delete(blogId);
    CacheService.delete('blogs:all');
    CacheService.delete(`blog:${blogId}`);
  }
}
