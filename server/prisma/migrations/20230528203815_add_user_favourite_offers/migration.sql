-- CreateTable
CREATE TABLE "user_favourite_offers" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "offer_id" INTEGER NOT NULL,

    CONSTRAINT "user_favourite_offers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_favourite_offers" ADD CONSTRAINT "user_favourite_offers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favourite_offers" ADD CONSTRAINT "user_favourite_offers_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
