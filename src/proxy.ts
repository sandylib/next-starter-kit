import { NextRequest } from 'next/server';
import { i18nHandler, chain } from '@/core/proxies';

export function proxy(request: NextRequest) {
  return chain([i18nHandler])(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
