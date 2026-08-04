/*
  Warnings:

  - Added the required column `technicianProfileId` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "technicianProfileId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "TechnicianProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bio" TEXT,
    "experience" INTEGER,
    "availability" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "TechnicianProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TechnicianProfile_userId_key" ON "TechnicianProfile"("userId");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_technicianProfileId_fkey" FOREIGN KEY ("technicianProfileId") REFERENCES "TechnicianProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicianProfile" ADD CONSTRAINT "TechnicianProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
