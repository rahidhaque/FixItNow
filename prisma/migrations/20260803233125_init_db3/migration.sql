/*
  Warnings:

  - You are about to drop the column `technicianProfileId` on the `Service` table. All the data in the column will be lost.
  - Added the required column `technicianId` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_technicianProfileId_fkey";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "technicianProfileId",
ADD COLUMN     "technicianId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "TechnicianProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
