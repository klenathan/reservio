import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../prisma/prisma";

interface IProps {
  params: {
    id: string;
  };
}

/**
 * GET Single user data
 * @param req request object recieved from users
 * @param param1 URL Params
 * @returns a single User object without password
 */

export async function GET(req: NextRequest, { params }: IProps) {
  try {
    let user = await prisma.user.findUnique({
      where: {
        username: params.id,
      },
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

    if (!user) {
      return NextResponse.json(
        { error: "USER_NOT_FOUND", message: `user ${params.id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "UNKNOWN_ERR", message: error.message },
      { status: 500 }
    );
  }
}
