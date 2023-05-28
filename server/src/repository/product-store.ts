import { Prisma } from '@prisma/client';
import { Store } from '../config/database';

const makeProductStore = ({ database }: Store) => {
  const findMany = async <
    T extends Prisma.ProductWhereInput | undefined,
    K extends Prisma.ProductInclude | undefined
  >({
    where,
    include
  }: {
    where: T;
    include: K;
  }) => {
    try {
      return await database.product.findMany({ where, include });
    } catch (err: any) {
      // TODO: handle err
      throw new Error(err);
    }
  };

  return {
    findMany
  };
};

export default makeProductStore;
