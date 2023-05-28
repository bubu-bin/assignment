import { Prisma } from '@prisma/client';
import { Store } from '../config/database';

const makeOfferStore = ({ database }: Store) => {
  const findMany = async <
    T extends Prisma.OfferWhereInput | undefined,
    K extends Prisma.OfferInclude | undefined
  >({
    where,
    include
  }: {
    where: T;
    include: K;
  }) => {
    try {
      return await database.offer.findMany({ where, include });
    } catch (err: any) {
      // TODO: handle err
      throw new Error(err);
    }
  };

  const find = async <
    T extends Prisma.OfferWhereUniqueInput,
    K extends Prisma.OfferInclude | undefined
  >({
    where,
    include
  }: {
    where: T;
    include: K;
  }) => {
    try {
      return await database.offer.findUniqueOrThrow({ where, include });
    } catch (err: any) {
      // TODO: handle err
      throw new Error(err);
    }
  };

  const addFavouriteOffer = async ({ data }: { data: any }) => {
    try {
      return await database.userFavouriteOffers.create({ data });
    } catch (err: any) {
      // TODO: handle err
      console.log(err);
      throw new Error(err);
    }
  };

  const findFavouritesOffers = async <
    T extends Prisma.UserFavouriteOffersWhereInput | undefined,
    K extends Prisma.UserFavouriteOffersInclude | undefined
  >({
    where,
    include
  }: {
    where: T;
    include: K;
  }) => {
    try {
      return await database.userFavouriteOffers.findMany({ where, include });
    } catch (err: any) {
      // TODO: handle err
      console.log(err);
      throw new Error(err);
    }
  };

  return {
    findMany,
    find,
    addFavouriteOffer,
    findFavouritesOffers
  };
};

export default makeOfferStore;
