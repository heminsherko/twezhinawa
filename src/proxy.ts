import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("admin-token")?.value;
  const isAuthPage = req.nextUrl.pathname.startsWith("/admin/login");

  if (isAuthPage) {
    if (token) {
      try {
        await verifyAuth(token);
        return NextResponse.redirect(new URL("/admin", req.url));
      } catch (err) {
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  try {
    await verifyAuth(token);
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};