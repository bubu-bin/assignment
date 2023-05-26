/*
  Warnings:

  - You are about to drop the column `question_id` on the `inter_dependent_questions` table. All the data in the column will be lost.
  - Added the required column `leading_question_id` to the `inter_dependent_questions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "inter_dependent_questions" DROP CONSTRAINT "inter_dependent_questions_question_id_fkey";

-- AlterTable
ALTER TABLE "inter_dependent_questions" DROP COLUMN "question_id",
ADD COLUMN     "leading_question_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "inter_dependent_questions" ADD CONSTRAINT "inter_dependent_questions_leading_question_id_fkey" FOREIGN KEY ("leading_question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
