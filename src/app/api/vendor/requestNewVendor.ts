import CustomError from "@/Errors/CustomError";
import UnauthenticatedError from "@/Errors/UnauthenticateError";
import getRequestBody from "@/utils/getRequestBody";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../prisma/prisma";

type VendorStatus = {
  PENDING: "PENDING",
  BANNED: "BANNED",
  ACCEPTED: "ACCEPTED"
}

interface INewVendorProps {
  username: string;
  userId?: string;
  status: "PENDING" | "BANNED" | "ACCEPTED";
  desc: string;
  user?: any
}

export default async function requestNewVendor(
  req: NextRequest
): Promise<NextResponse> {
  let requestData: INewVendorProps = await getRequestBody(req);

  let data: INewVendorProps = {
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
