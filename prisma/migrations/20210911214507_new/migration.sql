/*
  Warnings:

  - You are about to drop the column `registeredAt` on the `CharsPerMinute` table. All the data in the column will be lost.
  - You are about to drop the column `accuracy` on the `TypingAccuracy` table. All the data in the column will be lost.
  - You are about to drop the column `registeredAt` on the `TypingAccuracy` table. All the data in the column will be lost.
  - You are about to drop the column `registeredAt` on the `WordsPerMinute` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `CharsPerMinute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `TestPreset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `TypingAccuracy` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `keystrokes` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `testsCompleted` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `wordsWritten` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `UserOnUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `WordsPerMinute` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CharsPerMinute" DROP COLUMN "registeredAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "TestPreset" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "TypingAccuracy" DROP COLUMN "accuracy",
DROP COLUMN "registeredAt",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DEFAULT E'',
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "country" SET NOT NULL,
ALTER COLUMN "country" SET DEFAULT E'',
ALTER COLUMN "keystrokes" SET NOT NULL,
ALTER COLUMN "testsCompleted" SET NOT NULL,
ALTER COLUMN "wordsWritten" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserOnUser" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "WordsPerMinute" DROP COLUMN "registeredAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
