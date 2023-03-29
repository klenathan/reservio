import { NextRequest, NextResponse } from "next/server";
import { hashPassword, comparePassword } from "../password";
import prisma from "../../prisma/prisma";
import { sign, verify } from "jsonwebtoken";

const generateTokenPair = () => {};

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

    ///////////////////// Generate access token hjhj /////////////////////
    const accessToken = sign(
      {
        /// Expire in 7 days
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 1,
        username: data.username,
      },
      jwt_secrete
    );

    const refreshToken = sign(
      {
        username: data.username,
      },
      jwtRefreshTokenSecrete
    );

    if (!accessToken) {
      return NextResponse.json(
        { error: "JWT_SIGNING_ERR", message: "Error upon signing JWT" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: "success",
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Other err occurs", message: error.message },
      { status: 500 }
    );
  }
}
