import { NextResponse } from "next/server";
import { getArchitects } from "@/lib/architects";

export async function GET() {
  try {
    const architects = await getArchitects();
    return NextResponse.json(architects);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch architects." }, { status: 500 });
  }
}
