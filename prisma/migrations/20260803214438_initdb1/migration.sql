/*
  Warnings:

  - You are about to drop the column `technicianId` on the `Booking` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_technicianId_fkey";

-- DropIndex
DROP INDEX "Booking_technicianId_idx";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "technicianId";
