import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { routing } from '@/i18n/routing';

const handleI18n = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // next-intl marks the internal /fr rewrite with this request header. If the
  // hosting adapter evaluates middleware again for that rewritten URL, let the
  // already-localized filesystem route continue instead of redirecting /fr
  // back to the same unprefixed URL and creating a loop.
  const locale = request.headers.get('x-next-intl-locale');
  const firstSegment = request.nextUrl.pathname.split('/')[1];
  if (locale && routing.locales.includes(locale as typeof routing.locales[number]) && firstSegment === locale) {
    return NextResponse.next();
  }

  return handleI18n(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|opengraph-image|.*\\..*).*)'],
};
