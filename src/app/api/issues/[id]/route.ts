import { NextRequest } from 'next/server';
import { GetIssueHandler } from '@/backend/handlers/issues/GetIssueHandler';
import { UpdateIssueHandler } from '@/backend/handlers/issues/UpdateIssueHandler';
import { DeleteIssueHandler } from '@/backend/handlers/issues/DeleteIssueHandler';

type Params = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, context: Params) {
  const handler = new GetIssueHandler();
  const params = await context.params;
  return handler.handle(req, { params });
}

export async function PUT(req: NextRequest, context: Params) {
  const handler = new UpdateIssueHandler();
  const params = await context.params;
  return handler.handle(req, { params });
}

export async function DELETE(req: NextRequest, context: Params) {
  const handler = new DeleteIssueHandler();
  const params = await context.params;
  return handler.handle(req, { params });
}
