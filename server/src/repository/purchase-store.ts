import { Store } from '../config/database';

const makePurchaseStore = ({ database }: Store) => {
  // TODO: handle any
  const create = async ({ data }: { data: any }) => {
    try {
      return await database.purchase.create({ data });
    } catch (err: any) {
      // TODO: handle err
      throw new Error(err);
    }
  };

  return {
    create
  };
};

export default makePurchaseStore;
