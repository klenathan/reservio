import { NextRequest, NextResponse } from "next/server";
import prisma from "../prisma/prisma";

export async function GET(req: NextRequest) {
  
  let user = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      password: false,
      email: true,
      phoneNo: true,
      avatar: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return NextResponse.json(user, { status: 200 });
}
