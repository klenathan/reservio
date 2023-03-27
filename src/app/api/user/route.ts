import { NextRequest, NextResponse } from "next/server";
import prisma from "../prisma/prisma";

export async function GET(req: NextRequest) {
  console.log(req.nextUrl);
  let user = await prisma.user.findMany({});
  return NextResponse.json({ user: user });
}
