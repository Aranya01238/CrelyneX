import { NextResponse } from "next/server";
import { readEventsCoursesData } from "@/lib/events-courses";

export async function GET() {
  try {
    const data = await readEventsCoursesData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to load events and courses.",
      },
      { status: 500 },
    );
  }
}