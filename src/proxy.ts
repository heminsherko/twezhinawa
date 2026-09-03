import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Only protect /admin routes (except /admin/login and api routes if necessary, but we can protect them too or just UI)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('admin-token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await verifyAuth(token);
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Prevent logged in users from seeing login page
  if (pathname === '/admin/login') {
    const token = request.cookies.get('admin-token')?.value;
    if (token) {
      try {
        await verifyAuth(token);
        return NextResponse.redirect(new URL('/admin', request.url));
      } catch (err) {
        // invalid token, let them login
        return NextResponse.next();
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
