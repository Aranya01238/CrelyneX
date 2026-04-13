import { NextResponse } from "next/server";
import { getActivityLogs } from "@/lib/activity";
import { 
  ADMIN_SESSION_COOKIE, 
  ADMIN_SESSION_VALUE,
  HR_SESSION_COOKIE,
  HR_SESSION_VALUE,
  ADMIN2_SESSION_COOKIE,
  ADMIN2_SESSION_VALUE
} from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get(ADMIN_SESSION_COOKIE)?.value === ADMIN_SESSION_VALUE;
  const isAdmin2 = cookieStore.get(ADMIN2_SESSION_COOKIE)?.value === ADMIN2_SESSION_VALUE;
  const isHR = cookieStore.get(HR_SESSION_COOKIE)?.value === HR_SESSION_VALUE;

  if (!isAdmin && !isHR && !isAdmin2) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let logs = await getActivityLogs();
    
    // HR is restricted to MEMBER logs ONLY
    // Since Admin2 is an "Admin" role, we allow them full log visibility 
    // unless the user specifies otherwise. For now, matching "Admin" status.
    if (isHR && !isAdmin && !isAdmin2) {
      logs = logs.filter(log => log.role === "member");
    }

    return NextResponse.json(logs);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch logs" }, { status: 500 });
  }
}
