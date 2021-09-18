-- CreateEnum
CREATE TYPE "UserBadge" AS ENUM ('PRO', 'TESTER', 'DEFAULT');

-- AlterTable
ALTER TABLE "TestPreset" ADD COLUMN     "creatorImage" TEXT NOT NULL DEFAULT E'';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "badge" "UserBadge" NOT NULL DEFAULT E'DEFAULT';
