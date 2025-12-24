import { NextRequest } from 'next/server';
import { ListIssuesHandler } from '@/backend/handlers/issues/ListIssuesHandler';
import { CreateIssueHandler } from '@/backend/handlers/issues/CreateIssueHandler';

export async function GET(req: NextRequest) {
  const handler = new ListIssuesHandler();
  return handler.handle(req);
}

export async function POST(req: NextRequest) {
  const handler = new CreateIssueHandler();
  return handler.handle(req);
}
