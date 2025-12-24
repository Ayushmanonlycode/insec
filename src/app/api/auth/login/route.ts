import { NextRequest } from 'next/server';
import { LoginHandler } from '@/backend/handlers/LoginHandler';

const handler = new LoginHandler();

export async function POST(req: NextRequest) {
  return handler.handle(req);
}
