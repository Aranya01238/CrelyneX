import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { getAllCredentials, getMemberCredentials, setMemberCredentials } from "@/lib/social";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_VALUE,
  MEMBER_SESSION_COOKIE,
  MEMBER_SESSION_VALUE,
  MEMBER_ID_COOKIE,
} from "@/lib/auth";
import { getMember } from "@/lib/members";

async function getAuthContext() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get(ADMIN_SESSION_COOKIE)?.value === ADMIN_SESSION_VALUE;
  const memberSession = cookieStore.get(MEMBER_SESSION_COOKIE)?.value === MEMBER_SESSION_VALUE;
  const memberId = cookieStore.get(MEMBER_ID_COOKIE)?.value;
  return { isAdmin, memberSession, memberId };
}

// GET: Admin gets all, member gets their own
export async function GET(request: Request) {
  const { isAdmin, memberSession, memberId } = await getAuthContext();

  if (isAdmin) {
    const url = new URL(request.url);
    const forMember = url.searchParams.get("memberId");
    if (forMember) {
      const creds = await getMemberCredentials(forMember);
      return NextResponse.json(creds);
    }
    const all = await getAllCredentials();
    return NextResponse.json(all);
  }

  if (memberSession && memberId) {
    const member = await getMember(memberId);
    if (!member?.portals.includes("social")) {
      return NextResponse.json({ error: "No access to Social portal." }, { status: 403 });
    }
    const creds = await getMemberCredentials(memberId);
    return NextResponse.json(creds);
  }

  return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
}

const credentialsSchema = z.object({
  memberId: z.string().min(1),
  instagram: z.object({ username: z.string(), password: z.string() }).optional(),
  facebook: z.object({ username: z.string(), password: z.string() }).optional(),
  linkedin: z.object({ username: z.string(), password: z.string() }).optional(),
});

// POST/PATCH: Admin only sets credentials
export async function POST(request: Request) {
  const { isAdmin } = await getAuthContext();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = credentialsSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data." }, { status: 400 });
    }

    const { memberId, ...creds } = parsed.data;
    await setMemberCredentials(memberId, creds);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to set credentials." }, { status: 500 });
  }
}
