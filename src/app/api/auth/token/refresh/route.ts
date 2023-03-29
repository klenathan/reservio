import { NextRequest, NextResponse } from "next/server";
import { sign, verify, VerifyErrors } from "jsonwebtoken";

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
    const jwtRefreshToken = process.env.JWT_REFRESH_TOKEN_SECRETE;

    let reqBody = await req.json();
    let refreshtoken = reqBody.refreshToken;

    if (!refreshtoken) {
      return NextResponse.json(
        {
          error: "INVALID_TOKEN",
          message: "Please include refreshToken field",
        },
        { status: 400 }
      );
    }

    return verify(
      refreshtoken,
      process.env.JWT_REFRESH_TOKEN_SECRETE,
      (error: VerifyErrors | null, decoded: any) => {
        if (error) {
          return NextResponse.json(
            { error: "FAILED_JWT_VERIFY", message: error.message },
            { status: 401 }
          );
        }
        const accessToken = sign(
          {
            /// Expire in 7 days
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
            username: decoded.username,
          },
          jwt_secrete
        );

        const newRefreshToken = sign(
          {
            username: decoded.username,
          },
          jwtRefreshToken
        );

        return NextResponse.json(
          { accessToken: accessToken, refreshtoken: newRefreshToken },
          { status: 200 }
        );
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Other err occurs", message: error.message },
      { status: 500 }
    );
  }
}
