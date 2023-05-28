-- CreateTable
CREATE TABLE "purchases" (
    "id" SERIAL NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);
