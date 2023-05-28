import { Response, Request, NextFunction } from 'express';
import { ListOffers } from '../use-cases/list-offers';

export type GetOffersRequestParams = any;

const makeGetOffers = ({ listOffers }: { listOffers: ListOffers }) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params = {
        productCategory: req.query.productCategory
      } as GetOffersRequestParams;

      const result = await listOffers.execute(params);

      res.send(result);
    } catch (err) {
      next(err);
    }
  };
};

export default makeGetOffers;
