import { NextRequest } from 'next/server';
import { ListBlogsHandler } from '@/backend/handlers/blogs/ListBlogsHandler';
import { CreateBlogHandler } from '@/backend/handlers/blogs/CreateBlogHandler';

export async function GET(req: NextRequest) {
  const handler = new ListBlogsHandler();
  return handler.handle(req);
}

export async function POST(req: NextRequest) {
  const handler = new CreateBlogHandler();
  return handler.handle(req);
}
