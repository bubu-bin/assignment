import { FormData, Prisma } from '@prisma/client';
import { Store } from '../config/database';
import { getErrorMessage } from '../tools';
import { ServerErrorDefinition } from '../types';
import { ApplicationError } from '../handlers/ApplicationError';
import { HttpStatusCode } from 'axios';

const makeFormDataStore = ({ database }: Store) => {
  const find = async <
    T extends Prisma.FormDataWhereInput | undefined,
    K extends Prisma.FormDataInclude | undefined
  >({
    where,
    include
  }: {
    where: T;
    include: K;
  }) => {
    try {
      return await database.formData.findFirst({ where, include });
    } catch (err) {
      const message = getErrorMessage(err);

      throw new ApplicationError({
        message,
        statusCode: HttpStatusCode.BadRequest,
        type: ServerErrorDefinition.DATABASE
      });
    }
  };

  const findMany = async <
    T extends Prisma.FormDataWhereInput | undefined,
    K extends Prisma.FormDataInclude | undefined
  >({
    where,
    include
  }: {
    where: T;
    include: K;
  }) => {
    try {
      return await database.formData.findMany({ where, include });
    } catch (err) {
      const message = getErrorMessage(err);

      throw new ApplicationError({
        message,
        statusCode: HttpStatusCode.BadRequest,
        type: ServerErrorDefinition.DATABASE
      });
    }
  };

  const update = async <
    T extends Prisma.FormDataWhereUniqueInput,
    K extends Prisma.FormDataUncheckedUpdateInput
  >({
    where,
    data
  }: {
    where: T;
    data: K;
  }) => {
    try {
      return await database.formData.update({ where, data });
    } catch (err) {
      const message = getErrorMessage(err);

      throw new ApplicationError({
        message,
        statusCode: HttpStatusCode.BadRequest,
        type: ServerErrorDefinition.DATABASE
      });
    }
  };

  const create = async <
    T extends Prisma.Without<
      Prisma.FormDataCreateInput,
      Prisma.FormDataUncheckedCreateInput
    > &
      Prisma.FormDataUncheckedCreateInput
  >({
    data
  }: {
    data: T;
  }) => {
    try {
      return await database.formData.create({ data });
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
    find,
    findMany,
    update,
    create
  };
};

export default makeFormDataStore;
