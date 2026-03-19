import { NextRequest, NextResponse } from 'next/server';

type ProxyHandler = (request: NextRequest) => NextResponse | Promise<NextResponse>;

/**
 * Chain multiple proxy handlers together (Next.js 16)
 * Handlers are executed in order, and the response from one is passed to the next
 */
export function chain(handlers: ProxyHandler[]) {
  return async (request: NextRequest) => {
    let response = NextResponse.next();

    for (const handler of handlers) {
      const result = await handler(request);
      if (result) {
        response = result;
      }
    }

    return response;
  };
}
