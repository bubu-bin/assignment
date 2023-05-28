import { HttpStatusCode } from 'axios';
import { Store } from '../config/database';
import { ApplicationError } from '../handlers/ApplicationError';
import { getErrorMessage } from '../tools';
import { ServerErrorDefinition } from '../types';

const makeUserStore = ({ database }: Store) => {
  const find = async ({ id }: { id: number }) => {
    try {
      return await database.user.findFirstOrThrow({ where: { id } });
    } catch (err) {
      const message = getErrorMessage(err);

      throw new ApplicationError({
        message,
        statusCode: HttpStatusCode.NotFound,
        type: ServerErrorDefinition.DATABASE
      });
    }
  };

  return {
    find
  };
};

export default makeUserStore;
