/*
  Warnings:

  - The primary key for the `Token` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Token" DROP CONSTRAINT "Token_pkey",
ALTER COLUMN "tokenId" DROP DEFAULT,
ALTER COLUMN "tokenId" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("tokenId");
DROP SEQUENCE "Token_tokenId_seq";
