// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

prisma = new PrismaClient({ errorFormat: "minimal" });

export default prisma;
