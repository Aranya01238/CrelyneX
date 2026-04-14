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
import { getArchitects, createArchitect, updateArchitect, deleteArchitect } from "@/lib/architects";

async function isManagement() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get(ADMIN_SESSION_COOKIE)?.value === ADMIN_SESSION_VALUE;
  const isHR = cookieStore.get(HR_SESSION_COOKIE)?.value === HR_SESSION_VALUE;
  const isAdmin2 = cookieStore.get(ADMIN2_SESSION_COOKIE)?.value === ADMIN2_SESSION_VALUE;
  return isAdmin || isHR || isAdmin2;
}

export async function GET() {
  if (!(await isManagement())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const architects = await getArchitects();
  return NextResponse.json(architects);
}

const createSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().min(1),
  icon: z.string().min(1),
});

export async function POST(request: Request) {
  if (!(await isManagement())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data." }, { status: 400 });
    }

    const architect = await createArchitect(parsed.data);
    return NextResponse.json(architect, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create architect." }, { status: 500 });
  }
}

const updateSchema = z.object({
  id: z.string().min(1),
  name: z.string().optional(),
  role: z.string().optional(),
  bio: z.string().optional(),
  icon: z.string().optional(),
});

export async function PATCH(request: Request) {
  if (!(await isManagement())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data." }, { status: 400 });
    }

    const { id, ...updates } = parsed.data;
    const updated = await updateArchitect(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Architect not found." }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to update architect." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isManagement())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { id?: string };
    if (!body.id) {
      return NextResponse.json({ error: "Missing architect ID." }, { status: 400 });
    }
    const deleted = await deleteArchitect(body.id);
    if (!deleted) {
      return NextResponse.json({ error: "Architect not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete architect." }, { status: 500 });
  }
}
