import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE } from "@/lib/auth";
import { getAllUpdates } from "@/lib/updates";

function isAdmin(cookieStore: ReturnType<typeof cookies> extends Promise<infer U> ? U : ReturnType<typeof cookies>) {
  return cookieStore.get(ADMIN_SESSION_COOKIE)?.value === ADMIN_SESSION_VALUE;
}

export async function GET() {
  const cookieStore = await cookies();
  if (!isAdmin(cookieStore)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const allUpdates = await getAllUpdates();
  return NextResponse.json(allUpdates);
}
