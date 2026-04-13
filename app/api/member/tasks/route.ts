import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { MEMBER_SESSION_COOKIE, MEMBER_SESSION_VALUE, MEMBER_ID_COOKIE } from "@/lib/auth";
import { updateTask, getTasks } from "@/lib/members";

function getMemberId(cookieStore: any) {
  const session = cookieStore.get(MEMBER_SESSION_COOKIE)?.value;
  if (session !== MEMBER_SESSION_VALUE) return null;
  return cookieStore.get(MEMBER_ID_COOKIE)?.value ?? null;
}

export async function PATCH(request: Request) {
  const cookieStore = await cookies();
  const memberId = getMemberId(cookieStore);

  if (!memberId) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id } = body;

    if (!id) return NextResponse.json({ error: "Missing task id." }, { status: 400 });

    const tasks = await getTasks();
    const task = tasks.find(t => t.id === id);

    if (!task) {
      return NextResponse.json({ error: "Task not found." }, { status: 404 });
    }

    if (task.toMemberId !== memberId) {
      return NextResponse.json({ error: "Unauthorized access to this task." }, { status: 403 });
    }

    await updateTask(id, { memberMarkedDone: true });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to update task." }, { status: 500 });
  }
}
