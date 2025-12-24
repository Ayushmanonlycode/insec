import { NextResponse } from 'next/server';

export abstract class BaseHandler {
  protected success(data: any, status = 200) {
    return NextResponse.json({ success: true, data }, { status });
  }

  protected error(message: string, status = 400) {
    return NextResponse.json({ success: false, error: message }, { status });
  }

  protected unauthorized(message = 'Unauthorized') {
    return this.error(message, 401);
  }

  protected internalError(message = 'Internal Server Error') {
    return this.error(message, 500);
  }
}
