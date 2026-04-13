import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE } from "@/lib/auth";
import { getTasks, createTask, updateTask, deleteTask, getTasksForMember, updateMember, getMember } from "@/lib/members";
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
  points: z.number().min(1).max(3),
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
    const body = (await request.json()) as { 
      id?: string; 
      action?: "approve" | "reject" | "update_status";
      status?: "pending" | "done";
    };

    if (!body.id) return NextResponse.json({ error: "Missing id." }, { status: 400 });

    const tasks = await getTasks();
    const task = tasks.find(t => t.id === body.id);
    if (!task) return NextResponse.json({ error: "Task not found." }, { status: 404 });

    if (body.action === "approve") {
      // Approve: Award points to member and set status to done
      const updated = await updateTask(body.id, { status: "done", memberMarkedDone: true });
      if (updated) {
        const member = await getMember(task.toMemberId);
        if (member) {
          await updateMember(task.toMemberId, { 
            creditPoints: (member.creditPoints || 0) + task.points 
          });
        }
      }
      return NextResponse.json({ ok: true });
    }

    if (body.action === "reject") {
      // Reject: Reset memberMarkedDone, keep status pending
      await updateTask(body.id, { memberMarkedDone: false, status: "pending" });
      return NextResponse.json({ ok: true });
    }

    // Default status update (legacy or direct admin set)
    if (body.status) {
      await updateTask(body.id, { status: body.status });
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Invalid action." }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Failed to process task update." }, { status: 500 });
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
