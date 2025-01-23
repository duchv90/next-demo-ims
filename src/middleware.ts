import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { verifySession } from '@/lib/dal';
import { publicRoutes } from '@/utils/routes';
import { Urls } from '@/constants';

const intlMiddleware = createMiddleware({
  locales: routing.locales,
  localePrefix: routing.localePrefix,
  defaultLocale: routing.defaultLocale,
  localeDetection: routing.localeDetection,
});

export default async function middleware(req: NextRequest) {
  const response = intlMiddleware(req);

  const [, locale, ...segments] = req.nextUrl.pathname.split('/');
  const currentLocale = locale || routing.defaultLocale;

  const path = segments.length > 0 ? `/${segments.join('/')}` : '';
  const isPublicRoute = publicRoutes.includes(path);

  const auth = await verifySession();

  if (!auth.isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(
      new URL(`/${currentLocale}${Urls.login}`, req.nextUrl),
    );
  }

  if (auth.isAuthenticated && path === Urls.login) {
    return NextResponse.redirect(
      new URL(`/${currentLocale}${Urls.dashboard}`, req.nextUrl),
    );
  }

  if (auth.isAuthenticated) {
  }

  if (response instanceof Response) {
    return response;
  }

  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images).*)',
  ],
};
