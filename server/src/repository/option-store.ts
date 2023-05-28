import { HttpStatusCode } from 'axios';
import { Store } from '../config/database';
import { ApplicationError } from '../handlers/ApplicationError';
import { getErrorMessage } from '../tools';
import { ServerErrorDefinition } from '../types';

const makeOptionStore = ({ database }: Store) => {
  const find = async () => {
    try {
      return await database.option.findFirstOrThrow();
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
      return await database.option.findMany();
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

export default makeOptionStore;
