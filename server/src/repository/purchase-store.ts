import { HttpStatusCode } from 'axios';
import { Store } from '../config/database';
import { ApplicationError } from '../handlers/ApplicationError';
import { getErrorMessage } from '../tools';
import { ServerErrorDefinition } from '../types';

const makePurchaseStore = ({ database }: Store) => {
  const create = async ({ data }: { data: any }) => {
    try {
      return await database.purchase.create({ data });
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
    create
  };
};

export default makePurchaseStore;
