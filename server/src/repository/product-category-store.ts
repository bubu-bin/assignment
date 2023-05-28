import { Store } from '../config/database';

const makeProductCategoryStore = ({ database }: Store) => {
  // TODO: handle any
  const find = async ({ where }: { where: any }) => {
    try {
      return await database.productCategory.findFirstOrThrow({ where });
    } catch (err: any) {
      // TODO: handle err
      throw new Error(err);
    }
  };

  const findMany = async () => {
    try {
      return await database.productCategory.findMany();
    } catch (err: any) {
      // TODO: handle err
      throw new Error(err);
    }
  };

  return {
    find,
    findMany
  };
};

export default makeProductCategoryStore;
