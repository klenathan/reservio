import { NextRequest, NextResponse } from "next/server";
import { hashPassword, comparePassword } from "../password";
import prisma from "../../prisma/prisma";
import UnauthenticatedError from "@/Errors/UnauthenticateError";
import CustomError from "@/Errors/CustomError";
import getRequestBody from "@/utils/getRequestBody";
import generateTokenPair from "@/utils/generateTokenPair";

interface ILoginData {
  username: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    ///////////////////// Process login data /////////////////////
    let data: ILoginData = await getRequestBody(req);

    if (!data?.password) {
      throw new CustomError(
        "INVALID_PASSWORD",
        "Cannot find password on request's form",
        401
      );
    }
    let userData = await prisma.user
      .findUnique({
        where: { username: data.username },
      })
      .then(async (r) => {
        if (!r?.password) {
          throw new CustomError(
            "INVALID_PASSWORD",
            "Cannot find password from database",
            401
          );
        }

        if (!(await comparePassword(data.password, r?.password))) {
          throw new UnauthenticatedError(
            `Wrong password of user ${data.username}`
          );
        }
        const { password: _, ...returnData } = r;
        return returnData;
      });

    ///////////////////// Generate access token /////////////////////
    const [accessToken, refreshToken] = generateTokenPair(userData);

    if (!accessToken) {
      throw new CustomError("JWT_SIGNING_ERR", "Error upon signing JWT", 500);
    }

    return NextResponse.json({
      status: "success",
      user: userData,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error: any) {
    if (error instanceof UnauthenticatedError) {
      return NextResponse.json(
        { error: error.name, message: error.message },
        { status: 401 }
      );
    } else if (error instanceof CustomError) {
      return NextResponse.json(
        { error: error.name, message: error.message },
        { status: error.statusCode }
      );
    }
    return NextResponse.json(
      { error: "Login error occurs", code: error.name, message: error.message },
      { status: 500 }
    );
  }
}
