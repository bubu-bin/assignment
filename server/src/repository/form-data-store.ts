import { FormData, Prisma } from '@prisma/client';
import { Store } from '../config/database';

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
    } catch (err: any) {
      // TODO: handle err
      throw new Error(err);
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
    } catch (err: any) {
      // TODO: handle err
      throw new Error(err);
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
    } catch (err: any) {
      // TODO: handle err
      throw new Error(err);
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
    } catch (err: any) {
      // TODO: handle err
      throw new Error(err);
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
