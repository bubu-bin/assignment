import { Response, Request, NextFunction } from 'express';
import { ShowUser } from '../use-cases/show-user';
import { AddPurchase } from '../use-cases/add-purchase';

export type PostPurchaseBody = any;

const makePostPurchase = ({ addPurchase }: { addPurchase: AddPurchase }) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body as PostPurchaseBody;
      const result = await addPurchase.execute({ data });

      res.send(result);
    } catch (err) {
      next(err);
    }
  };
};

export default makePostPurchase;
