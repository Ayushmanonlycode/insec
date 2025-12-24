import { NextRequest } from 'next/server';
import { LogoutHandler } from '@/backend/handlers/LogoutHandler';

const handler = new LogoutHandler();

export async function POST(req: NextRequest) {
  return handler.handle(req);
}
