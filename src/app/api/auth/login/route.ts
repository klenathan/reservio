import { NextRequest, NextResponse } from "next/server";
import { hashPassword, comparePassword } from "../password";
import prisma from "../../prisma/prisma";
import { sign, verify } from "jsonwebtoken";
import { User } from "@prisma/client";
import UnauthenticatedError from "@/Errors/UnauthenticateError";
import CustomError from "@/Errors/CustomError";

const generateTokenPair = () => {};

type UserWithoutPassword = Omit<User, "password">;

export async function POST(req: NextRequest) {
  try {
    //// Ensure JWT Secrete key exist
    if (!process.env.JWT_SECRETE || !process.env.JWT_REFRESH_TOKEN_SECRETE) {
      return NextResponse.json({
        error: "Other err occurs",
        message: "Please include JWT Secrete key into ENV config file",
      });
    }

    let jwt_secrete = process.env.JWT_SECRETE || "";
    let jwtRefreshTokenSecrete = process.env.JWT_REFRESH_TOKEN_SECRETE || "";

    ///////////////////// Process login data /////////////////////
    let data: { username: string; password: string } = await req.json();
    if (!data?.password) {
      throw new CustomError(
        "INVALID_PASSWORD",
        "Cannot find password on request's header",
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

    ///////////////////// Generate access token hjhj /////////////////////
    const accessToken = sign(
      {
        /// Expire in 7 days
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 1,
        user: userData,
      },
      jwt_secrete
    );

    const refreshToken = sign(
      {
        user: userData,
      },
      jwtRefreshTokenSecrete
    );

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
      { error: "Other err occurs", code: error.name, message: error.message },
      { status: 500 }
    );
  }
}
