import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_VALUE,
  MEMBER_SESSION_COOKIE,
  MEMBER_SESSION_VALUE,
} from "@/lib/auth";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protect Admin Routes
  if (path.startsWith("/admin")) {
    const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    if (session !== ADMIN_SESSION_VALUE) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Protect Member Routes
  if (path.startsWith("/member")) {
    const session = request.cookies.get(MEMBER_SESSION_COOKIE)?.value;
    if (session !== MEMBER_SESSION_VALUE) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/member", "/member/:path*"],
};