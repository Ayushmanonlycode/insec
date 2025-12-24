import { NextRequest } from 'next/server';
import { GetStatsHandler } from '@/backend/handlers/stats/GetStatsHandler';

export async function GET(req: NextRequest) {
  const handler = new GetStatsHandler();
  return handler.handle(req);
}
