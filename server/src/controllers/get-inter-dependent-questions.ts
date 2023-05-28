import { Response, Request, NextFunction } from 'express';
import { ShowUser } from '../use-cases/show-user';
import { ListInterDependentQuestions } from '../use-cases/list-inter-dependent-questions';

export type GetInterDependentQuestionsQuery = {
  questionId: string;
  value: string;
};

const makeGetInterDependentQuestions = ({
  listInterDependentQuestions
}: {
  listInterDependentQuestions: ListInterDependentQuestions;
}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query as GetInterDependentQuestionsQuery;

      const result = await listInterDependentQuestions.execute(query);

      res.send(result);
    } catch (err) {
      next(err);
    }
  };
};

export default makeGetInterDependentQuestions;
