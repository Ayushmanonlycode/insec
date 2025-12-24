import { NextRequest } from 'next/server';
import { RefreshHandler } from '@/backend/handlers/auth/RefreshHandler';

export async function POST(req: NextRequest) {
  const handler = new RefreshHandler();
  return handler.handle(req);
}
