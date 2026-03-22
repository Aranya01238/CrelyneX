import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE } from "@/lib/auth";
import { readEventsCoursesData, writeEventsCoursesData } from "@/lib/events-courses";

const courseSchema = z.object({
  title: z.string().min(2).max(200),
  price: z.string().min(1).max(40),
  duration: z.string().min(2).max(80),
  level: z.string().min(2).max(120),
  students: z.number().int().nonnegative(),
  description: z.string().min(5).max(2000),
  modules: z.array(z.string().min(1).max(120)).min(1),
  featured: z.boolean(),
  dates: z.array(z.string().min(1).max(80)).min(1),
  time: z.string().min(2).max(120),
  certificate: z.boolean(),
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
    const parsed = courseSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid course data." }, { status: 400 });
    }

    const data = await readEventsCoursesData();
    const nextCourse = {
      id: `course-${randomUUID()}`,
      ...parsed.data,
    };

    data.courses = [nextCourse, ...data.courses];
    await writeEventsCoursesData(data);

    return NextResponse.json({ ok: true, course: nextCourse });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to add course.",
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
      return NextResponse.json({ error: "Course id is required." }, { status: 400 });
    }

    const data = await readEventsCoursesData();
    data.courses = data.courses.filter((course) => course.id !== id);
    await writeEventsCoursesData(data);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to remove course.",
      },
      { status: 500 },
    );
  }
}