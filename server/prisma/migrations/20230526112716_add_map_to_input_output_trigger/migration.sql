/*
  Warnings:

  - You are about to drop the column `inputWhen` on the `input_output_triggers` table. All the data in the column will be lost.
  - You are about to drop the column `outputWith` on the `input_output_triggers` table. All the data in the column will be lost.
  - Added the required column `input_when` to the `input_output_triggers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `output_with` to the `input_output_triggers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "input_output_triggers" DROP COLUMN "inputWhen",
DROP COLUMN "outputWith",
ADD COLUMN     "input_when" JSONB NOT NULL,
ADD COLUMN     "output_with" JSONB NOT NULL;
