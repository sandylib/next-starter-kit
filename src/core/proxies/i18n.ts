import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/core/i18n/config';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'never',
  localeDetection: false,
});

export function i18nHandler(request: NextRequest) {
  return intlMiddleware(request);
}
