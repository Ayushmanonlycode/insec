import { Blog, NewBlog } from '@/lib/db/schema';

export interface IBlogRepository {
  findAll(): Promise<Blog[]>;
  findById(id: string): Promise<Blog | null>;
  create(blog: NewBlog): Promise<Blog>;
}
