import { NextRequest, NextResponse } from "next/server";
import prisma from "../../prisma/prisma";

interface IProps {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params }: IProps) {
  let user = await prisma.user.findUnique({
    where: {
      username: params.id,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "user not found" }, { status: 404 });
  }

  return NextResponse.json({ user: user }, { status: 200 });
}
