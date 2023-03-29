import { NextRequest, NextResponse } from "next/server";
import { sign, verify, VerifyErrors } from "jsonwebtoken";
import getRequestBody from "@/utils/getRequestBody";
import generateTokenPair from "@/utils/generateTokenPair";
import CustomError from "@/Errors/CustomError";
import prisma from "@/app/api/prisma/prisma";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.JWT_SECRETE || !process.env.JWT_REFRESH_TOKEN_SECRETE) {
      return NextResponse.json(
        {
          error: "Other err occurs",
          message: "Please include JWT Secrete key into ENV config file",
        },
        { status: 500 }
      );
    }

    let reqBody = await getRequestBody(req);
    let refreshtoken = reqBody.refreshToken;

    if (!refreshtoken) {
      throw new CustomError(
        "INVALID_TOKEN",
        "Please include refreshToken field",
        422
      );
    }

    const userData: any = verify(
      refreshtoken,
      process.env.JWT_REFRESH_TOKEN_SECRETE,
      (error: VerifyErrors | null, decoded: any) => {
        if (error) {
          throw new CustomError("FAILED_JWT_VERIFY", error.message, 401);
        }
        return decoded.user;
      }
    );

    const [accessToken, newRefreshToken] = generateTokenPair(userData);

    return NextResponse.json(
      { accessToken: accessToken, refreshtoken: newRefreshToken },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Other err occurs", message: error.message },
      { status: 500 }
    );
  }
}
