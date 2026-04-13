import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { 
  ADMIN_SESSION_COOKIE, 
  ADMIN_SESSION_VALUE,
  HR_SESSION_COOKIE,
  HR_SESSION_VALUE,
  ADMIN2_SESSION_COOKIE,
  ADMIN2_SESSION_VALUE
} from "@/lib/auth";
import { getAllUpdates } from "@/lib/updates";

function isManagement(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  const isAdmin = cookieStore.get(ADMIN_SESSION_COOKIE)?.value === ADMIN_SESSION_VALUE;
  const isHR = cookieStore.get(HR_SESSION_COOKIE)?.value === HR_SESSION_VALUE;
  const isAdmin2 = cookieStore.get(ADMIN2_SESSION_COOKIE)?.value === ADMIN2_SESSION_VALUE;
  return isAdmin || isHR || isAdmin2;
}

export async function GET() {
  const cookieStore = await cookies();
  if (!isManagement(cookieStore)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const allUpdates = await getAllUpdates();
  return NextResponse.json(allUpdates);
}
