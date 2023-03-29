/*
  Warnings:

  - Added the required column `desc` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Vendor` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VendorStatus" AS ENUM ('PENDING', 'ACCEPTED', 'BANNED');

-- AlterTable
ALTER TABLE "Vendor" ADD COLUMN     "desc" TEXT NOT NULL,
ADD COLUMN     "status" "VendorStatus" NOT NULL;
