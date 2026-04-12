import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { getMemberFollowers, addFollowerEntry } from "@/lib/social";
import type { SocialPlatform } from "@/lib/social";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_VALUE,
  MEMBER_SESSION_COOKIE,
  MEMBER_SESSION_VALUE,
  MEMBER_ID_COOKIE,
  MEMBER_NAME_COOKIE,
} from "@/lib/auth";
import { getMember } from "@/lib/members";

async function getAuthContext() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get(ADMIN_SESSION_COOKIE)?.value === ADMIN_SESSION_VALUE;
  const memberSession = cookieStore.get(MEMBER_SESSION_COOKIE)?.value === MEMBER_SESSION_VALUE;
  const memberId = cookieStore.get(MEMBER_ID_COOKIE)?.value;
  const memberName = cookieStore.get(MEMBER_NAME_COOKIE)?.value;
  return { isAdmin, memberSession, memberId, memberName };
}

export async function GET(request: Request) {
  const { isAdmin, memberSession, memberId } = await getAuthContext();
  const url = new URL(request.url);
  const targetMemberId = url.searchParams.get("memberId");

  if (isAdmin && targetMemberId) {
    const data = await getMemberFollowers(targetMemberId);
    return NextResponse.json(data);
  }

  if (memberSession && memberId) {
    const member = await getMember(memberId);
    if (!member?.portals.includes("social")) {
      return NextResponse.json({ error: "No access to Social portal." }, { status: 403 });
    }
    const data = await getMemberFollowers(memberId);
    return NextResponse.json(data);
  }

  return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
}

const addSchema = z.object({
  platform: z.enum(["instagram", "facebook", "linkedin"]),
  count: z.number().int().min(0),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

export async function POST(request: Request) {
  const { isAdmin, memberSession, memberId, memberName } = await getAuthContext();

  if (!isAdmin && !memberSession) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let actorId = memberId ?? "admin";
  let actorName = memberName ?? "Admin";

  if (!isAdmin && memberId) {
    const member = await getMember(memberId);
    if (!member?.portals.includes("social")) {
      return NextResponse.json({ error: "No access to Social portal." }, { status: 403 });
    }
    actorName = member.name;
  }

  try {
    const body = await request.json();
    const parsed = addSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data." }, { status: 400 });
    }

    await addFollowerEntry(actorId, parsed.data.platform as SocialPlatform, {
      count: parsed.data.count,
      addedBy: actorId,
      addedByName: actorName,
      date: parsed.data.date,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to log followers." }, { status: 500 });
  }
}
