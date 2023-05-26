/*
  Warnings:

  - You are about to drop the `dependent_questions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trigger_conditions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "dependent_questions" DROP CONSTRAINT "dependent_questions_depedent_question_id_fkey";

-- DropForeignKey
ALTER TABLE "dependent_questions" DROP CONSTRAINT "dependent_questions_question_id_fkey";

-- DropForeignKey
ALTER TABLE "dependent_questions" DROP CONSTRAINT "dependent_questions_trigger_condition_id_fkey";

-- DropTable
DROP TABLE "dependent_questions";

-- DropTable
DROP TABLE "trigger_conditions";

-- CreateTable
CREATE TABLE "inter_dependent_questions" (
    "id" SERIAL NOT NULL,
    "question_id" INTEGER NOT NULL,
    "inter_depedent_question_id" INTEGER NOT NULL,
    "input_output_trigger_id" INTEGER NOT NULL,

    CONSTRAINT "inter_dependent_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "input_output_triggers" (
    "id" SERIAL NOT NULL,
    "inputWhen" JSONB NOT NULL,
    "outputWith" JSONB NOT NULL,

    CONSTRAINT "input_output_triggers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "inter_dependent_questions_input_output_trigger_id_key" ON "inter_dependent_questions"("input_output_trigger_id");

-- AddForeignKey
ALTER TABLE "inter_dependent_questions" ADD CONSTRAINT "inter_dependent_questions_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inter_dependent_questions" ADD CONSTRAINT "inter_dependent_questions_inter_depedent_question_id_fkey" FOREIGN KEY ("inter_depedent_question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inter_dependent_questions" ADD CONSTRAINT "inter_dependent_questions_input_output_trigger_id_fkey" FOREIGN KEY ("input_output_trigger_id") REFERENCES "input_output_triggers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
