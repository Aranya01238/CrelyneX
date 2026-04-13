import { NextResponse } from "next/server";
import { z } from "zod";
import {
  ADMIN_ID,
  ADMIN_PASSWORD,
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_VALUE,
  HR_ID,
  HR_PASSWORD,
  HR_SESSION_COOKIE,
  HR_SESSION_VALUE,
  MEMBER_SESSION_COOKIE,
  MEMBER_SESSION_VALUE,
  MEMBER_ID_COOKIE,
  MEMBER_NAME_COOKIE,
  MEMBER_PORTALS_COOKIE,
  ADMIN2_ID,
  ADMIN2_PASSWORD,
  ADMIN2_SESSION_COOKIE,
  ADMIN2_SESSION_VALUE,
} from "@/lib/auth";
import { getMembers, updateMember } from "@/lib/members";
import { logActivity } from "@/lib/activity";

const loginSchema = z.object({
  id: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = loginSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const { id, password } = parsed.data;

    // Check admin credentials first
    if (id === ADMIN_ID && password === ADMIN_PASSWORD) {
      await logActivity(id, "admin", "Management Login");
      const response = NextResponse.json({ ok: true, role: "admin", redirect: "/admin" });
      response.cookies.set({
        name: ADMIN_SESSION_COOKIE,
        value: ADMIN_SESSION_VALUE,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 8,
      });
      return response;
    }

    if (id === HR_ID && password === HR_PASSWORD) {
      await logActivity(id, "hr", "Operations Login");
      const response = NextResponse.json({ ok: true, role: "hr", redirect: "/hr" });
      response.cookies.set({
        name: HR_SESSION_COOKIE,
        value: HR_SESSION_VALUE,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 8,
      });
      return response;
    }

    // Check Admin2 credentials
    if (id === ADMIN2_ID && password === ADMIN2_PASSWORD) {
      await logActivity(id, "admin", "Governance Login");
      const response = NextResponse.json({ ok: true, role: "admin", redirect: "/admin2" });
      response.cookies.set({
        name: ADMIN2_SESSION_COOKIE,
        value: ADMIN2_SESSION_VALUE,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 8,
      });
      return response;
    }

    // Check member credentials
    const members = await getMembers();
    const member = members.find((m) => m.id === id && m.password === password);

    if (member) {
      await updateMember(member.id, { lastLoginAt: new Date().toISOString() });
      await logActivity(member.id, "member", "Portal Login");
      
      const response = NextResponse.json({
        ok: true,
        role: "member",
        redirect: "/member",
        portals: member.portals,
      });
      const cookieOpts = {
        httpOnly: true,
        sameSite: "lax" as const,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 8,
      };
      response.cookies.set({ name: MEMBER_SESSION_COOKIE, value: MEMBER_SESSION_VALUE, ...cookieOpts });
      response.cookies.set({ name: MEMBER_ID_COOKIE, value: member.id, ...cookieOpts });
      // Name and portals are not httpOnly so client can read them
      response.cookies.set({ name: MEMBER_NAME_COOKIE, value: member.name, httpOnly: false, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 8 });
      response.cookies.set({ name: MEMBER_PORTALS_COOKIE, value: member.portals.join(","), httpOnly: false, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 8 });
      return response;
    }

    return NextResponse.json(
      { error: "Invalid ID or password." },
      { status: 401 }
    );
  } catch {
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}