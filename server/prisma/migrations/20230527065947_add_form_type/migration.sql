/*
  Warnings:

  - A unique constraint covering the columns `[product_category_id,user_id,form_type_id]` on the table `forms` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `form_type_id` to the `forms` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FormTypeDefinition" AS ENUM ('SEARCH', 'PURCHASE');

-- DropIndex
DROP INDEX "forms_product_category_id_user_id_key";

-- AlterTable
ALTER TABLE "forms" ADD COLUMN     "form_type_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "form_types" (
    "id" SERIAL NOT NULL,
    "name" "FormTypeDefinition" NOT NULL,

    CONSTRAINT "form_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "forms_product_category_id_user_id_form_type_id_key" ON "forms"("product_category_id", "user_id", "form_type_id");

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_form_type_id_fkey" FOREIGN KEY ("form_type_id") REFERENCES "form_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
