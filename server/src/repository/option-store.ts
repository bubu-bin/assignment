import { Store } from '../config/database';

const makeOptionStore = ({ database }: Store) => {
  const find = async () => {
    try {
      return await database.option.findFirstOrThrow();
    } catch (err: any) {
      // TODO: handle err
      throw new Error(err);
    }
  };

  const findMany = async () => {
    try {
      return await database.option.findMany();
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

export default makeOptionStore;
