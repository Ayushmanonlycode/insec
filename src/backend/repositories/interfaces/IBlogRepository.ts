import { Blog } from '../../types/Blog';
import { NewBlog } from '../../../lib/db/schema';


export interface IBlogRepository {
  findAll(): Promise<(Blog & { author: { username: string } })[]>;
  findById(id: string): Promise<(Blog & { author: { username: string } }) | null>;
  create(blog: NewBlog): Promise<Blog & { author: { username: string } }>;
  update(id: string, blog: Partial<Blog>): Promise<Blog & { author: { username: string } }>;
  delete(id: string): Promise<void>;
}
