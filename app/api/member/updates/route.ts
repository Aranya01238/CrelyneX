import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { MEMBER_ID_COOKIE, MEMBER_SESSION_COOKIE, MEMBER_SESSION_VALUE } from "@/lib/auth";
import { getMemberUpdates, submitDailyUpdate } from "@/lib/updates";

function getAuthorizedMemberId(cookieStore: ReturnType<typeof cookies> extends Promise<infer U> ? U : ReturnType<typeof cookies>): string | null {
  const session = cookieStore.get(MEMBER_SESSION_COOKIE)?.value;
  const memberId = cookieStore.get(MEMBER_ID_COOKIE)?.value;
  if (session === MEMBER_SESSION_VALUE && memberId) {
    return memberId;
  }
  return null;
}

export async function GET() {
  const cookieStore = await cookies();
  const memberId = getAuthorizedMemberId(cookieStore);
  
  if (!memberId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const updates = await getMemberUpdates(memberId);
  return NextResponse.json(updates);
}

const updateSchema = z.object({
  instagramCount: z.number().min(0),
  facebookCount: z.number().min(0),
  events: z.array(z.object({
    eventId: z.string().min(1),
    eventName: z.string().min(1),
    count: z.number().min(0)
  })).optional().default([])
});

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const memberId = getAuthorizedMemberId(cookieStore);
  
  if (!memberId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = updateSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
    }

    const data = await submitDailyUpdate(memberId, parsed.data);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit update." }, { status: 500 });
  }
}
