import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json(
    { message: "Hello from Reservio API V1" },
    { status: 200 }
  );
}
