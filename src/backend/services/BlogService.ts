import { IBlogRepository } from '../repositories/IBlogRepository';
import { Blog, NewBlog } from '@/lib/db/schema';

export class BlogService {
  constructor(private blogRepository: IBlogRepository) {}

  async getAllBlogs(): Promise<Blog[]> {
    return await this.blogRepository.findAll();
  }

  async createBlog(authorId: string, data: { title: string; content: string }): Promise<Blog> {
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
}
