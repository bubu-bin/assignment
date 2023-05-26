import { Store } from '../config/database';

const makeUserStore = ({ database }: Store) => {
  const find = async ({ id }: { id: number }) => {
    try {
      return await database.user.findFirstOrThrow({ where: { id } });
    } catch (err) {
      // TODO: handle err
    }
  };

  return {
    find
  };
};

export default makeUserStore;
