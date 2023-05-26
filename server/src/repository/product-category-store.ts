import { Store } from '../config/database';

const makeProductCategoryStore = ({ database }: Store) => {
  const find = async () => {
    try {
      return await database.productCategory.findFirstOrThrow();
    } catch (err) {
      // TODO: handle err
    }
  };

  const findMany = async () => {
    try {
      return await database.productCategory.findMany();
    } catch (err) {
      // TODO: handle err
    }
  };

  return {
    find,
    findMany
  };
};

export default makeProductCategoryStore;
