import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE } from "@/lib/auth";
import { getTasks, createTask, updateTaskStatus, deleteTask, getTasksForMember } from "@/lib/members";
import { MEMBER_SESSION_COOKIE, MEMBER_SESSION_VALUE, MEMBER_ID_COOKIE } from "@/lib/auth";

function isAdmin(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return cookieStore.get(ADMIN_SESSION_COOKIE)?.value === ADMIN_SESSION_VALUE;
}

function getMemberId(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  const session = cookieStore.get(MEMBER_SESSION_COOKIE)?.value;
  if (session !== MEMBER_SESSION_VALUE) return null;
  return cookieStore.get(MEMBER_ID_COOKIE)?.value ?? null;
}

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const url = new URL(request.url);
  const forMember = url.searchParams.get("memberId");

  if (isAdmin(cookieStore)) {
    if (forMember) {
      const tasks = await getTasksForMember(forMember);
      return NextResponse.json(tasks);
    }
    const tasks = await getTasks();
    return NextResponse.json(tasks);
  }

  const memberId = getMemberId(cookieStore);
  if (memberId) {
    const tasks = await getTasksForMember(memberId);
    return NextResponse.json(tasks);
  }

  return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
}

const createSchema = z.object({
  toMemberId: z.string().min(1),
  toMemberName: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

export async function POST(request: Request) {
  const cookieStore = await cookies();
  if (!isAdmin(cookieStore)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data." }, { status: 400 });
    }
    const task = await createTask(parsed.data);
    return NextResponse.json(task, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create task." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const cookieStore = await cookies();
  if (!isAdmin(cookieStore)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { id?: string; status?: "pending" | "done" };
    if (!body.id || !body.status) {
      return NextResponse.json({ error: "Missing id or status." }, { status: 400 });
    }
    const ok = await updateTaskStatus(body.id, body.status);
    if (!ok) return NextResponse.json({ error: "Task not found." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to update task." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const cookieStore = await cookies();
  if (!isAdmin(cookieStore)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { id?: string };
    if (!body.id) return NextResponse.json({ error: "Missing id." }, { status: 400 });
    const ok = await deleteTask(body.id);
    if (!ok) return NextResponse.json({ error: "Task not found." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete task." }, { status: 500 });
  }
}
