/*
  Warnings:

  - Added the required column `name` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "placeholder" TEXT;
