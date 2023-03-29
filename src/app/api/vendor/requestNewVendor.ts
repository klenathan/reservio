import CustomError from "@/Errors/CustomError";
import UnauthenticatedError from "@/Errors/UnauthenticateError";
import getRequestBody from "@/utils/getRequestBody";
import { Prisma, VendorStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../prisma/prisma";

interface INewVendorProps {
  username: string;
  userId: string;
  status: VendorStatus;

  desc: string;
  user: string;
}

export default async function requestNewVendor(
  req: NextRequest
): Promise<NextResponse> {
  let requestData: INewVendorProps = await getRequestBody(req);

  let data: Prisma.VendorCreateInput = {
    username: requestData.username,
    status: "PENDING",
    desc: requestData.desc || "",
    user: {
      connect: { username: requestData.username },
    },
  };

  let newVendor = await prisma.vendor.create({ data: data });
  return NextResponse.json(
    { status: "success", vendor: newVendor },
    { status: 200 }
  );
}
