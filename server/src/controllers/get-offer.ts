import { Response, Request, NextFunction } from 'express';
import { ListProductCategories } from '../use-cases/list-product-categories';
import { ListOffers } from '../use-cases/list-offers';
import { ShowOffer } from '../use-cases/show-offer';

// TODO: handle any
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
