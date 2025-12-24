import { NextRequest } from 'next/server';
import { MeHandler } from '@/backend/handlers/MeHandler';

const handler = new MeHandler();

export async function GET(req: NextRequest) {
  return handler.handle(req);
}
