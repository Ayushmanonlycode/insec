import { NextRequest } from 'next/server';
import { RegisterHandler } from '@/backend/handlers/RegisterHandler';

const handler = new RegisterHandler();

export async function POST(req: NextRequest) {
  return handler.handle(req);
}
