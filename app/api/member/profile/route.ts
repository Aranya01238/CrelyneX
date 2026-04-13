import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { MEMBER_SESSION_COOKIE, MEMBER_SESSION_VALUE, MEMBER_ID_COOKIE } from "@/lib/auth";
import { getMember } from "@/lib/members";

function getMemberId(cookieStore: any) {
  const session = cookieStore.get(MEMBER_SESSION_COOKIE)?.value;
  if (session !== MEMBER_SESSION_VALUE) return null;
  return cookieStore.get(MEMBER_ID_COOKIE)?.value ?? null;
}

export async function GET() {
  const cookieStore = await cookies();
  const memberId = getMemberId(cookieStore);

  if (!memberId) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const member = await getMember(memberId);
  if (!member) {
    return NextResponse.json({ error: "Member not found." }, { status: 404 });
  }

  return NextResponse.json({
    id: member.id,
    name: member.name,
    creditPoints: member.creditPoints || 0
  });
}
