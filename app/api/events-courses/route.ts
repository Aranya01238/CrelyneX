import { NextResponse } from "next/server";
import { readEventsCoursesData } from "@/lib/events-courses";

export async function GET() {
  const data = await readEventsCoursesData();
  return NextResponse.json(data);
}