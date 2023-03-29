import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("favicon.ico")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api")) {
    let removedStart = pathname.substring(4);
    if (!removedStart.startsWith("/auth")) {
      return verifyAPIToken(req);
    }
  }
  // console.log("middlware triggered", pathname);

  return NextResponse.next();
}

async function verifyAPIToken(req: NextRequest) {
  if (!process.env.JWT_SECRETE) {
    return NextResponse.json(
      {
        error: "Other err occurs",
        message: "Please include JWT Secrete key into ENV config file",
      },
      { status: 500 }
    );
  }
  let authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json(
      {
        error: "INVALID_ACCESS_TOKEN",
        message: "Cannot find access token on request's header",
      },
      { status: 401 }
    );
  }

  const token = authHeader.substring(7, authHeader.length);
  let validToken = await jose.jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRETE)
  );

  if (!validToken) {
    return NextResponse.json(
      {
        error: "INVALID_API_ACCESS_TOKEN",
      },
      { status: 401 }
    );
  }
}
