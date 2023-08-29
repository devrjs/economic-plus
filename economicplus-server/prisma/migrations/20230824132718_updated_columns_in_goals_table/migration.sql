/*
  Warnings:

  - You are about to drop the column `goalDate` on the `goals` table. All the data in the column will be lost.
  - You are about to drop the column `openingBalance` on the `goals` table. All the data in the column will be lost.
  - You are about to drop the column `targetValue` on the `goals` table. All the data in the column will be lost.
  - Added the required column `startingAmount` to the `goals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetAmount` to the `goals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetDate` to the `goals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "goals" DROP COLUMN "goalDate",
DROP COLUMN "openingBalance",
DROP COLUMN "targetValue",
ADD COLUMN     "startingAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "targetAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "targetDate" TIMESTAMP(3) NOT NULL;
