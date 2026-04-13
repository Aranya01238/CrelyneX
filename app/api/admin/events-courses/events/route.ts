import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE } from "@/lib/auth";
import { readEventsCoursesData, writeEventsCoursesData } from "@/lib/events-courses";

const eventSchema = z.object({
  title: z.string().min(2).max(200),
  date: z.string().min(2).max(120),
  time: z.string().min(2).max(120),
  attendees: z.number().int().nonnegative(),
  location: z.string().min(2).max(120),
  description: z.string().min(5).max(2000),
  category: z.string().min(2).max(80),
  price: z.string().min(1).max(40),
  registrationLink: z.string().url().max(400),
});

async function isAdminAuthorized() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return session === ADMIN_SESSION_VALUE;
}

export async function POST(request: Request) {
  if (!(await isAdminAuthorized())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const parsed = eventSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid event data." }, { status: 400 });
    }

    const data = await readEventsCoursesData();
    const nextEvent = {
      id: `event-${randomUUID()}`,
      ...parsed.data,
    };

    data.events = [nextEvent, ...data.events];
    await writeEventsCoursesData(data);

    return NextResponse.json({ ok: true, event: nextEvent });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to add event.",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthorized())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = (await request.json()) as { id?: string };
    const id = payload.id;

    if (!id) {
      return NextResponse.json({ error: "Event id is required." }, { status: 400 });
    }

    const data = await readEventsCoursesData();
    data.events = data.events.filter((event) => event.id !== id);
    await writeEventsCoursesData(data);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to remove event.",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthorized())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const { id, ...updateData } = payload;

    if (!id) {
      return NextResponse.json({ error: "Event id is required." }, { status: 400 });
    }

    const parsed = eventSchema.safeParse(updateData);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid event data." }, { status: 400 });
    }

    const data = await readEventsCoursesData();
    const index = data.events.findIndex((e) => e.id === id);
    
    if (index === -1) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 });
    }

    data.events[index] = { ...data.events[index], ...parsed.data };
    await writeEventsCoursesData(data);

    return NextResponse.json({ ok: true, event: data.events[index] });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to update event.",
      },
      { status: 500 },
    );
  }
}