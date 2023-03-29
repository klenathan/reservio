import { NextRequest, NextResponse } from "next/server";
import prisma from "../prisma/prisma";

export default async function getAllVendors(req: NextRequest) {
  let vendors = await prisma.vendor.findMany({
    include: {
      user: {
        select: {
          username: true,
          firstName: true,
          lastName: true,
          email: true,
          phoneNo: true,
          avatar: true,
        },
      },
    },
  });

  return NextResponse.json(
    { count: vendors.length, data: vendors },
    { status: 200 }
  );
}
