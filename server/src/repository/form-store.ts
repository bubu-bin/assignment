import { Prisma } from '@prisma/client';
import { Store } from '../config/database';
import { getErrorMessage } from '../tools';
import { ServerErrorDefinition } from '../types';
import { HttpStatusCode } from 'axios';
import { ApplicationError } from '../handlers/ApplicationError';

const makeFormStore = ({ database }: Store) => {
  const create = async ({ data }: { data: any }) => {
    try {
      return await database.form.create({ data });
    } catch (err) {
      const message = getErrorMessage(err);

      throw new ApplicationError({
        message,
        statusCode: HttpStatusCode.BadRequest,
        type: ServerErrorDefinition.DATABASE
      });
    }
  };

  const find = async <
    T extends Prisma.FormWhereInput,
    K extends Prisma.FormInclude | undefined
  >({
    where,
    include
  }: {
    where: T;
    include: K;
  }) => {
    try {
      return await database.form.findFirstOrThrow({
        where,
        include
      });
    } catch (err) {
      const message = getErrorMessage(err);

      throw new ApplicationError({
        message,
        statusCode: HttpStatusCode.NotFound,
        type: ServerErrorDefinition.DATABASE
      });
    }
  };

  const updateFormData = async ({ where, data }: { data: any; where: any }) => {
    try {
      return await database.form.update({ where, data });
    } catch (err) {
      const message = getErrorMessage(err);

      throw new ApplicationError({
        message,
        statusCode: HttpStatusCode.BadRequest,
        type: ServerErrorDefinition.DATABASE
      });
    }
  };

  const findFormType = async ({ where }: { where: any }) => {
    try {
      return await database.formType.findFirstOrThrow({ where });
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
    create,
    find,
    updateFormData,
    findFormType
  };
};

export default makeFormStore;
