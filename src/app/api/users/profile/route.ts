import { NextRequest } from 'next/server';
import { GetProfileHandler } from '@/backend/handlers/users/GetProfileHandler';
import { UpdateProfileHandler } from '@/backend/handlers/users/UpdateProfileHandler';

export async function GET(req: NextRequest) {
  const handler = new GetProfileHandler();
  return handler.handle(req);
}

export async function PUT(req: NextRequest) {
  const handler = new UpdateProfileHandler();
  return handler.handle(req);
}
