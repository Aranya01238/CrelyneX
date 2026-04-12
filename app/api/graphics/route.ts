import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { getUploads, addUpload, deleteUpload } from "@/lib/graphics";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_VALUE,
  MEMBER_SESSION_COOKIE,
  MEMBER_SESSION_VALUE,
  MEMBER_ID_COOKIE,
  MEMBER_NAME_COOKIE,
} from "@/lib/auth";
import { getMember } from "@/lib/members";

async function getAuthContext() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get(ADMIN_SESSION_COOKIE)?.value === ADMIN_SESSION_VALUE;
  const memberSession = cookieStore.get(MEMBER_SESSION_COOKIE)?.value === MEMBER_SESSION_VALUE;
  const memberId = cookieStore.get(MEMBER_ID_COOKIE)?.value;
  const memberName = cookieStore.get(MEMBER_NAME_COOKIE)?.value;
  return { isAdmin, memberSession, memberId, memberName };
}

export async function GET() {
  const { isAdmin, memberSession, memberId } = await getAuthContext();

  if (!isAdmin && !memberSession) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  // Verify member has graphics portal access
  if (!isAdmin && memberId) {
    const member = await getMember(memberId);
    if (!member?.portals.includes("graphics")) {
      return NextResponse.json({ error: "No access to Graphics portal." }, { status: 403 });
    }
  }

  const uploads = await getUploads();
  return NextResponse.json(uploads);
}

const addSchema = z.object({
  title: z.string().min(1),
  type: z.enum(["poster", "video"]),
  url: z.string().url(),
  thumbnail: z.string().optional(),
  description: z.string().optional(),
});

export async function POST(request: Request) {
  const { isAdmin, memberSession, memberId, memberName } = await getAuthContext();

  if (!isAdmin && !memberSession) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let uploaderId = "admin";
  let uploaderName = "Admin";

  if (!isAdmin && memberId) {
    const member = await getMember(memberId);
    if (!member?.portals.includes("graphics")) {
      return NextResponse.json({ error: "No access to Graphics portal." }, { status: 403 });
    }
    uploaderId = memberId;
    uploaderName = memberName ?? member.name;
  }

  try {
    const body = await request.json();
    const parsed = addSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data." }, { status: 400 });
    }
    const upload = await addUpload({
      ...parsed.data,
      uploadedBy: uploaderId,
      uploadedByName: uploaderName,
    });
    return NextResponse.json(upload, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to add upload." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { isAdmin, memberSession, memberId } = await getAuthContext();

  if (!isAdmin && !memberSession) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { id?: string };
    if (!body.id) return NextResponse.json({ error: "Missing upload ID." }, { status: 400 });

    const uploads = await getUploads();
    const upload = uploads.find((u) => u.id === body.id);
    if (!upload) return NextResponse.json({ error: "Upload not found." }, { status: 404 });

    // Members can only delete their own uploads; admin can delete any
    if (!isAdmin && upload.uploadedBy !== memberId) {
      return NextResponse.json({ error: "Cannot delete others' uploads." }, { status: 403 });
    }

    await deleteUpload(body.id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete upload." }, { status: 500 });
  }
}
