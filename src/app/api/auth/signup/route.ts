import { NextRequest, NextResponse } from "next/server";
import { hashPassword, comparePassword } from "../password";
import prisma from "../../prisma/prisma";
import { Prisma } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    let data: Prisma.UserCreateInput;
    data = await req.json();
    
    if (!data.username || !data.password) {
      return NextResponse.json(
        {
          error: "INVALID_INPUT",
          message: "Please include all fields: avatar, username, password",
        },
        { status: 422 }
      );
    }

    if (!data.avatar) {
      data.avatar = "blank_for_now";
    }

    data.password = await hashPassword(data.password);

    return await prisma.user
      .create({
        data: data,
      })
      .then((r) => {
        return NextResponse.json({ r }, { status: 200 });
      })
      .catch((e) => {
        console.log(e instanceof Prisma.PrismaClientKnownRequestError);

        return NextResponse.json(e.message, { status: 500 });
      });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Other err occurs", message: error.message },
      { status: 500 }
    );
  }
}
