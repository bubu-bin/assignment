import { Prisma } from '@prisma/client';
import { Store } from '../config/database';

const makeQuestionStore = ({ database }: Store) => {
  const find = async <T extends Prisma.QuestionWhereInput>({
    where
  }: {
    where: T;
  }) => {
    try {
      return await database.question.findFirstOrThrow({ where });
    } catch (err: any) {
      // TODO: handle err
      throw new Error(err);
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
    } catch (err: any) {
      // TODO: handle err
      throw new Error(err);
    }
  };

  const findInterDependentQuestions = async ({
    leadingQuestionId
  }: {
    leadingQuestionId: number;
  }) => {
    try {
      return await database.questionsOnInterDependentQuestions.findMany({
        where: {
          leadingQuestionId
        },
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
    } catch (err: any) {
      // TODO: handle err
      throw new Error(err);
    }
  };

  return {
    find,
    findMany,
    findInterDependentQuestions
  };
};

export default makeQuestionStore;
