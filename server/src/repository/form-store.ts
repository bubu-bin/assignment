import { Prisma } from '@prisma/client';
import { Store } from '../config/database';

const makeFormStore = ({ database }: Store) => {
  // TODO: handle any
  const create = async ({ data }: { data: any }) => {
    try {
      return await database.form.create({ data });
    } catch (err: any) {
      // TODO: handle err
      throw new Error(err);
    }
  };

  // TODO: handle any
  const find = async <
    T extends Prisma.FormWhereInput,
    K extends Prisma.FormInclude | undefined
  >({
    where,
    include
  }: {
    where: T;
    include: K;
  }) => {
    try {
      return await database.form.findFirstOrThrow({
        where,
        include
      });
    } catch (err: any) {
      // TODO: handle err
      console.log(err);
      throw new Error(err);
    }
  };

  // TODO: handle any
  const updateFormData = async ({ where, data }: { data: any; where: any }) => {
    try {
      return await database.form.update({ where, data });
    } catch (err: any) {
      // TODO: handle err
      throw new Error(err);
    }
  };

  const findFormType = async ({ where }: { where: any }) => {
    try {
      return await database.formType.findFirstOrThrow({ where });
    } catch (err: any) {
      // TODO: handle err
      throw new Error(err);
    }
  };

  return {
    create,
    find,
    updateFormData,
    findFormType
  };
};

export default makeFormStore;
