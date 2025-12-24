import { NextRequest } from 'next/server';
import { RegisterHandler } from '@/backend/handlers/auth/RegisterHandler';

const handler = new RegisterHandler();

export async function POST(req: NextRequest) {
  return handler.handle(req);
}
