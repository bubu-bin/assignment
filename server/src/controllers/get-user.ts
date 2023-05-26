import { Response, Request, NextFunction } from 'express';
import { ShowUser } from '../use-cases/show-user';

const makeGetUser = ({ showUser }: { showUser: ShowUser }) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await showUser.execute();

      res.send(result);
    } catch (err) {
      next(err);
    }
  };
};

export default makeGetUser;
