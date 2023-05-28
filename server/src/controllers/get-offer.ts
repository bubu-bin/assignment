import { Response, Request, NextFunction } from 'express';
import { ShowOffer } from '../use-cases/show-offer';

export type GetOfferRequestParams = any;

const makeGetOffer = ({ showOffer }: { showOffer: ShowOffer }) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const params = req.params as GetOfferRequestParams;

      const result = await showOffer.execute(params);

      res.send(result);
    } catch (err) {
      next(err);
    }
  };
};

export default makeGetOffer;
