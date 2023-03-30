import CustomError from "@/Errors/CustomError";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import getAllVendors from "./getAllVendors";

import requestNewVendor from "./requestNewVendor";

export async function GET(req: NextRequest) {
  try {
    return await getAllVendors(req);
  } catch (error: any) {
    return NextResponse.json(
      { error: "GET_VENDOR_ERROR", message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    return await requestNewVendor(req);
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      let errorResponse = {
        status: "failed",
        error: error.name,
        errorCode: error.code,
        message: error.message,
        errMeta: error.meta?.cause,
      };
      return NextResponse.json(errorResponse, { status: 500 });
    }
    return NextResponse.json(
      { error: "NEW_VENDOR_REQUEST_ERROR", message: error.message },
      { status: 500 }
    );
  }
}
