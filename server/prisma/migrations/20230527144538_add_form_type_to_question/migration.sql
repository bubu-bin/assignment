/*
  Warnings:

  - Added the required column `form_type_id` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "form_type_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_form_type_id_fkey" FOREIGN KEY ("form_type_id") REFERENCES "form_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
