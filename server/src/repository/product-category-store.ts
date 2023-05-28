import { HttpStatusCode } from 'axios';
import { Store } from '../config/database';
import { ApplicationError } from '../handlers/ApplicationError';
import { getErrorMessage } from '../tools';
import { ServerErrorDefinition } from '../types';

const makeProductCategoryStore = ({ database }: Store) => {
  const find = async ({ where }: { where: any }) => {
    try {
      return await database.productCategory.findFirstOrThrow({ where });
    } catch (err) {
      const message = getErrorMessage(err);

      throw new ApplicationError({
        message,
        statusCode: HttpStatusCode.NotFound,
        type: ServerErrorDefinition.DATABASE
      });
    }
  };

  const findMany = async () => {
    try {
      return await database.productCategory.findMany();
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
    find,
    findMany
  };
};

export default makeProductCategoryStore;
