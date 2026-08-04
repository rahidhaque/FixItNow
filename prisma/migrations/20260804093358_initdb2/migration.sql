/*
  Warnings:

  - You are about to drop the column `customerId` on the `Payment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_customerId_fkey";

-- DropIndex
DROP INDEX "Payment_customerId_idx";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "customerId";
