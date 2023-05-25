-- CreateEnum
CREATE TYPE "ProductCategoryDefinition" AS ENUM ('CAR_DEAL', 'VEHICLE_INSURANCE');

-- CreateEnum
CREATE TYPE "QuestionTypeDefinition" AS ENUM ('OPTION', 'BOOLEAN', 'INPUT');

-- CreateEnum
CREATE TYPE "InputTypeDefinition" AS ENUM ('CHECKBOX', 'RADIO', 'TEXT');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_categories" (
    "id" SERIAL NOT NULL,
    "name" "ProductCategoryDefinition" NOT NULL,

    CONSTRAINT "product_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" SERIAL NOT NULL,
    "is_inter_dependent" BOOLEAN NOT NULL,
    "order" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "product_category_id" INTEGER NOT NULL,
    "question_type_id" INTEGER NOT NULL,
    "input_type_id" INTEGER NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_types" (
    "id" SERIAL NOT NULL,
    "name" "QuestionTypeDefinition" NOT NULL,

    CONSTRAINT "question_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "input_types" (
    "id" SERIAL NOT NULL,
    "name" "InputTypeDefinition" NOT NULL,

    CONSTRAINT "input_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "options" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "question_id" INTEGER NOT NULL,

    CONSTRAINT "options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dependent_questions" (
    "id" SERIAL NOT NULL,
    "question_id" INTEGER NOT NULL,
    "depedent_question_id" INTEGER NOT NULL,
    "trigger_condition_id" INTEGER NOT NULL,

    CONSTRAINT "dependent_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trigger_conditions" (
    "id" SERIAL NOT NULL,
    "fulfillment" JSONB NOT NULL,

    CONSTRAINT "trigger_conditions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forms" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "product_category_id" INTEGER NOT NULL,

    CONSTRAINT "forms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form_data" (
    "id" SERIAL NOT NULL,
    "form_id" INTEGER NOT NULL,
    "answer" JSONB NOT NULL,
    "question_id" INTEGER NOT NULL,

    CONSTRAINT "form_data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "dependent_questions_trigger_condition_id_key" ON "dependent_questions"("trigger_condition_id");

-- CreateIndex
CREATE UNIQUE INDEX "forms_product_category_id_user_id_key" ON "forms"("product_category_id", "user_id");

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "product_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_question_type_id_fkey" FOREIGN KEY ("question_type_id") REFERENCES "question_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_input_type_id_fkey" FOREIGN KEY ("input_type_id") REFERENCES "input_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dependent_questions" ADD CONSTRAINT "dependent_questions_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dependent_questions" ADD CONSTRAINT "dependent_questions_depedent_question_id_fkey" FOREIGN KEY ("depedent_question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dependent_questions" ADD CONSTRAINT "dependent_questions_trigger_condition_id_fkey" FOREIGN KEY ("trigger_condition_id") REFERENCES "trigger_conditions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forms" ADD CONSTRAINT "forms_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "product_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_data" ADD CONSTRAINT "form_data_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_data" ADD CONSTRAINT "form_data_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
