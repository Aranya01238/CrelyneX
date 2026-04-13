import { NextResponse } from "next/server";
import { 
  ADMIN_SESSION_COOKIE, 
  HR_SESSION_COOKIE,
  MEMBER_SESSION_COOKIE, 
  MEMBER_ID_COOKIE, 
  MEMBER_NAME_COOKIE, 
  MEMBER_PORTALS_COOKIE 
} from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });

  const cookieOpts = {
    value: "",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  };

  // Clear Admin
  response.cookies.set({ name: ADMIN_SESSION_COOKIE, ...cookieOpts });
  // Clear HR
  response.cookies.set({ name: HR_SESSION_COOKIE, ...cookieOpts });
  // Clear Member Session
  response.cookies.set({ name: MEMBER_SESSION_COOKIE, ...cookieOpts });
  // Clear Member Id
  response.cookies.set({ name: MEMBER_ID_COOKIE, ...cookieOpts });
  // Clear non-httpOnly ones
  response.cookies.set({ name: MEMBER_NAME_COOKIE, ...cookieOpts, httpOnly: false });
  response.cookies.set({ name: MEMBER_PORTALS_COOKIE, ...cookieOpts, httpOnly: false });

  return response;
}