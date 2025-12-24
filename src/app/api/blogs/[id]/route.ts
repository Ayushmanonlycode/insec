import { NextRequest } from 'next/server';
import { UpdateBlogHandler } from '@/backend/handlers/blogs/UpdateBlogHandler';
import { DeleteBlogHandler } from '@/backend/handlers/blogs/DeleteBlogHandler';

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, context: Params) {
  const handler = new UpdateBlogHandler();
  const params = await context.params;
  return handler.handle(req, { params });
}

export async function DELETE(req: NextRequest, context: Params) {
  const handler = new DeleteBlogHandler();
  const params = await context.params;
  return handler.handle(req, { params });
}
