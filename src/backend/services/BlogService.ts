import { IBlogRepository } from '../repositories/IBlogRepository';
import { Blog, NewBlog } from '@/lib/db/schema';

export class BlogService {
  constructor(private blogRepository: IBlogRepository) {}

  async getAllBlogs(): Promise<(Blog & { author: { username: string } })[]> {
    return await this.blogRepository.findAll();
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

    return await this.blogRepository.create(newBlog);
  }

  async updateBlog(userId: string, blogId: string, data: Partial<Blog>): Promise<Blog & { author: { username: string } }> {
    const blog = await this.blogRepository.findById(blogId);
    if (!blog) throw new Error('Blog not found');
    
    if (blog.authorId.toLowerCase() !== userId.toLowerCase()) {
      throw new Error('Unauthorized: Access Denied');
    }

    return await this.blogRepository.update(blogId, data);
  }

  async deleteBlog(userId: string, blogId: string): Promise<void> {
    const blog = await this.blogRepository.findById(blogId);
    if (!blog) throw new Error('Blog not found');
    
    if (blog.authorId.toLowerCase() !== userId.toLowerCase()) {
      throw new Error('Unauthorized: Access Denied');
    }

    await this.blogRepository.delete(blogId);
  }
}
