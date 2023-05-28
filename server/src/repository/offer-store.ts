import { Prisma } from '@prisma/client';
import { Store } from '../config/database';
import { ServerErrorDefinition } from '../types';
import { getErrorMessage } from '../tools';
import { HttpStatusCode } from 'axios';
import { ApplicationError } from '../handlers/ApplicationError';

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
    } catch (err) {
      const message = getErrorMessage(err);

      throw new ApplicationError({
        message,
        statusCode: HttpStatusCode.BadRequest,
        type: ServerErrorDefinition.DATABASE
      });
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
    } catch (err) {
      const message = getErrorMessage(err);

      throw new ApplicationError({
        message,
        statusCode: HttpStatusCode.NotFound,
        type: ServerErrorDefinition.DATABASE
      });
    }
  };

  const addFavouriteOffer = async ({ data }: { data: any }) => {
    try {
      return await database.userFavouriteOffers.create({ data });
    } catch (err) {
      const message = getErrorMessage(err);

      throw new ApplicationError({
        message,
        statusCode: HttpStatusCode.BadRequest,
        type: ServerErrorDefinition.DATABASE
      });
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
    } catch (err) {
      const message = getErrorMessage(err);

      throw new ApplicationError({
        message,
        statusCode: HttpStatusCode.BadRequest,
        type: ServerErrorDefinition.DATABASE
      });
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
