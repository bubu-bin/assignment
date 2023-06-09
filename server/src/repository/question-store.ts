import { InputTypeDefinition, Prisma } from '@prisma/client';
import { Store } from '../config/database';
import { getErrorMessage } from '../tools';
import { ServerErrorDefinition } from '../types';
import { HttpStatusCode } from 'axios';
import { ApplicationError } from '../handlers/ApplicationError';

const makeQuestionStore = ({ database }: Store) => {
  const find = async <T extends Prisma.QuestionWhereInput>({
    where
  }: {
    where: T;
  }) => {
    try {
      return await database.question.findFirstOrThrow({ where });
    } catch (err) {
      const message = getErrorMessage(err);

      throw new ApplicationError({
        message,
        statusCode: HttpStatusCode.NotFound,
        type: ServerErrorDefinition.DATABASE
      });
    }
  };

  const findMany = async <
    T extends Prisma.QuestionWhereInput | undefined,
    K extends Prisma.QuestionInclude | undefined
  >({
    include,
    where
  }: {
    include: K;
    where: T;
  }) => {
    try {
      return await database.question.findMany({
        include,
        where
      });
    } catch (err) {
      const message = getErrorMessage(err);

      throw new ApplicationError({
        message,
        statusCode: HttpStatusCode.BadRequest,
        type: ServerErrorDefinition.DATABASE
      });
    }
  };

  const findInterDependentQuestions = async <
    T extends Prisma.QuestionsOnInterDependentQuestionsWhereInput
  >({
    where
  }: {
    where: T;
  }) => {
    try {
      return await database.questionsOnInterDependentQuestions.findMany({
        where,
        include: {
          inputOutputTrigger: true,
          leadingQuestion: {
            include: {
              inputType: true,
              questionType: true
            }
          },
          interDependentQuestion: {
            include: {
              inputType: true,
              questionType: true,
              options: true,
              productCategory: true,
              interDependentQuestions: true
            }
          }
        }
      });
    } catch (err) {
      const message = getErrorMessage(err);

      throw new ApplicationError({
        message,
        statusCode: HttpStatusCode.BadRequest,
        type: ServerErrorDefinition.DATABASE
      });
    }
  };

  const findQuestionType = async ({ id }: { id: number }) => {
    try {
      return await database.questionType.findFirstOrThrow({ where: { id } });
    } catch (err) {
      const message = getErrorMessage(err);

      throw new ApplicationError({
        message,
        statusCode: HttpStatusCode.BadRequest,
        type: ServerErrorDefinition.DATABASE
      });
    }
  };

  const findInputType = async ({
    id,
    name
  }: {
    id?: number;
    name?: InputTypeDefinition;
  }) => {
    try {
      return await database.inputType.findFirstOrThrow({
        where: { id, name }
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

  return {
    find,
    findMany,
    findInterDependentQuestions,
    findQuestionType,
    findInputType
  };
};

export default makeQuestionStore;
