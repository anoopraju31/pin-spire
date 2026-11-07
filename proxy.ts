import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decryptSession } from '@/lib/auth/session';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('pin_spire_session')?.value;
  const session = await decryptSession(sessionCookie);

  const isAuthenticated = Boolean(session?.userId);
  const isAuthRoute = pathname === '/' || pathname.startsWith('/register');
  const isProtectedRoute = pathname.startsWith('/posts');

  // If user is authenticated and visiting login or register, forward to /posts
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL('/posts', request.url));
  }

  // If user is NOT authenticated and visiting a protected route, forward to login
  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: [
    // Apply proxy to all app pages except static files and Next.js internals
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
