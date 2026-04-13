import { NextResponse } from "next/server";
import { getActivityLogs } from "@/lib/activity";
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE);

  if (!session || session.value !== ADMIN_SESSION_VALUE) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const logs = await getActivityLogs();
    return NextResponse.json(logs);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 });
  }
}
