import { NextRequest, NextResponse } from "next/server";
import { hashPassword, comparePassword } from "../password";
import prisma from "../../prisma/prisma";
import { Prisma } from "@prisma/client";
import getRequestBody from "@/utils/getRequestBody";
import CustomError from "@/Errors/CustomError";
import generateTokenPair from "@/utils/generateTokenPair";

export async function POST(req: NextRequest) {
  try {
    let inputData: Prisma.UserCreateInput = await getRequestBody(req);

    if (!inputData.username || !inputData.password || !inputData.email) {
      throw new CustomError(
        "INVALID_INPUT",
        "Please include all fields: username, password",
        422
      );
    }

    let processedData = {
      username: inputData.username,
      firstName: inputData.firstName || "",
      lastName: inputData.lastName || "",
      password: await hashPassword(inputData.password),
      email: inputData.email,
      phoneNo: inputData.phoneNo || "",
      avatar: "blank_for_now",
    };

    return await prisma.user
      .create({
        data: processedData,
      })
      .then((r) => {
        const { id: id, password: pw, ...returnData } = r;

        const [accessToken, refreshToken] = generateTokenPair(returnData);

        return NextResponse.json(
          {
            status: "success",
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: returnData,
          },
          { status: 200 }
        );
      })
      .catch((e: Prisma.PrismaClientKnownRequestError) => {
        if (e.code == "P2002") {
          if (e.meta) {
            if ((e.meta["target"] as Array<string>).includes("email")) {
              throw new CustomError(
                "DUPLICATE_EMAIL",
                `Email ${inputData.email} is already registered`,
                422
              );
            } else if (
              (e.meta["target"] as Array<string>).includes("username")
            ) {
              throw new CustomError(
                "DUPLICATE_USERNAME",
                `Username ${inputData.username} already exist`,
                422
              );
            }
          }
        }

        throw new CustomError(e.code || e.name, e.message, 422);
      })
      .catch((e) => {
        throw new CustomError(e.name, e.message, 422);
      });
  } catch (error: any) {
    if (error instanceof CustomError) {
      return NextResponse.json(
        { errorCode: error.name, message: error.message },
        { status: error.statusCode }
      );
    }
    return NextResponse.json(
      { error: "Signup error occurs", message: error.message },
      { status: 500 }
    );
  }
}
