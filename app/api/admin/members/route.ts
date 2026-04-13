import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { 
  ADMIN_SESSION_COOKIE, 
  ADMIN_SESSION_VALUE,
  HR_SESSION_COOKIE,
  HR_SESSION_VALUE,
  ADMIN2_SESSION_COOKIE,
  ADMIN2_SESSION_VALUE
} from "@/lib/auth";
import { getMembers, createMember, updateMember, deleteMember } from "@/lib/members";

function isManagement(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  const isAdmin = cookieStore.get(ADMIN_SESSION_COOKIE)?.value === ADMIN_SESSION_VALUE;
  const isHR = cookieStore.get(HR_SESSION_COOKIE)?.value === HR_SESSION_VALUE;
  const isAdmin2 = cookieStore.get(ADMIN2_SESSION_COOKIE)?.value === ADMIN2_SESSION_VALUE;
  return isAdmin || isHR || isAdmin2;
}

export async function GET() {
  const cookieStore = await cookies();
  if (!isManagement(cookieStore)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const members = await getMembers();
  // Never expose passwords in list
  const safe = members.map(({ password: _pw, ...m }) => m);
  return NextResponse.json(safe);
}

const createSchema = z.object({
  name: z.string().min(1),
  id: z.string().min(3).regex(/^[a-zA-Z0-9_]+$/, "ID must be alphanumeric"),
  password: z.string().min(4),
  portals: z.array(z.enum(["graphics", "social", "updates"])),
});

export async function POST(request: Request) {
  const cookieStore = await cookies();
  if (!isManagement(cookieStore)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid data." }, { status: 400 });
    }

    const { name, id, password, portals } = parsed.data;

    // Check if ID already exists
    const existing = await getMembers();
    if (existing.find((m) => m.id === id)) {
      return NextResponse.json({ error: "A member with this ID already exists." }, { status: 409 });
    }

    const member = await createMember({ name, id, password, portals });
    const { password: _pw, ...safe } = member;
    return NextResponse.json(safe, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create member." }, { status: 500 });
  }
}

const updateSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).optional(),
  password: z.string().min(4).optional(),
  portals: z.array(z.enum(["graphics", "social", "updates"])).optional(),
});

export async function PATCH(request: Request) {
  const cookieStore = await cookies();
  if (!isManagement(cookieStore)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data." }, { status: 400 });
    }

    const { id, ...updates } = parsed.data;
    const updated = await updateMember(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Member not found." }, { status: 404 });
    }
    const { password: _pw, ...safe } = updated;
    return NextResponse.json(safe);
  } catch {
    return NextResponse.json({ error: "Failed to update member." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const cookieStore = await cookies();
  if (!isManagement(cookieStore)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { id?: string };
    if (!body.id) {
      return NextResponse.json({ error: "Missing member ID." }, { status: 400 });
    }
    const deleted = await deleteMember(body.id);
    if (!deleted) {
      return NextResponse.json({ error: "Member not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete member." }, { status: 500 });
  }
}
