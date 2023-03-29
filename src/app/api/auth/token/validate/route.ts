import { NextRequest, NextResponse } from "next/server";
import { sign, verify, VerifyErrors } from "jsonwebtoken";
import { access } from "fs";

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
    const jwt_secrete = process.env.JWT_SECRETE;

    let reqBody = await req.json();
    let accessToken = reqBody.accessToken;

    if (!accessToken) {
      return NextResponse.json(
        {
          error: "INVALID_TOKEN",
          message: "Please include refreshToken field",
        },
        { status: 400 }
      );
    }

    return verify(
      accessToken,
      jwt_secrete,
      (error: VerifyErrors | null, decoded: any) => {
        if (error) {
          return NextResponse.json(
            {
              valid: false,
              error: "FAILED_JWT_VERIFY",
              message: error.message,
            },
            { status: 401 }
          );
        }
        return NextResponse.json({ valid: true }, { status: 200 });
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Other err occurs", message: error.message },
      { status: 500 }
    );
  }
}
