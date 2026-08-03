/*
  Warnings:

  - Added the required column `categoryType` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_technicianId_fkey";

-- DropIndex
DROP INDEX "Service_categoryId_idx";

-- DropIndex
DROP INDEX "Service_technicianId_idx";

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "categoryType" TEXT NOT NULL;
