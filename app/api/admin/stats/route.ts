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
import { getMembers, getTasks } from "@/lib/members";
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

  try {
    const [members, tasks, updates] = await Promise.all([
      getMembers(),
      getTasks(),
      getAllUpdates()
    ]);

    const activeNodes = members.length;
    const completedTasks = tasks.filter(t => t.status === "done").length;
    const missionCompletion = tasks.length > 0 
      ? Math.round((completedTasks / tasks.length) * 100) 
      : 0;

    // Operational Velocity Calculation:
    // Based on the total number of update entries across all members
    const totalUpdateEntries = Object.values(updates).reduce((sum, entries) => sum + entries.length, 0);
    let velocity = "Stable";
    if (totalUpdateEntries > activeNodes * 5) velocity = "High";
    else if (totalUpdateEntries < activeNodes * 2) velocity = "Moderate";

    return NextResponse.json({
      activeNodes,
      missionCompletion: `${missionCompletion}%`,
      operationalVelocity: velocity,
      systemUptime: "99.9%"
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to generate stats" }, { status: 500 });
  }
}
