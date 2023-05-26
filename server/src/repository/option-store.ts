import { Store } from '../config/database';

const makeOptionStore = ({ database }: Store) => {
  const find = async () => {
    try {
      return await database.option.findFirstOrThrow();
    } catch (err) {
      // TODO: handle err
    }
  };

  const findMany = async () => {
    try {
      return await database.option.findMany();
    } catch (err) {
      // TODO: handle err
    }
  };

  return {
    find,
    findMany
  };
};

export default makeOptionStore;
