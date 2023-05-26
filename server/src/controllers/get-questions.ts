import { Response, Request, NextFunction } from 'express';
import { ListQuestions } from '../use-cases/list-questions';

const makeGetQuestions = ({
  listQuestions
}: {
  listQuestions: ListQuestions;
}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await listQuestions.execute();

      res.send(result);
    } catch (err) {
      next(err);
    }
  };
};

export default makeGetQuestions;
