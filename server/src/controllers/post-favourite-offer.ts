import { Response, Request, NextFunction } from 'express';
import { AddForm } from '../use-cases/add-form';
import { AddFavouriteOffer } from '../use-cases/add-favourite-offer';

export type PostFavouriteOfferBody = any;

const makePostFavouriteOffer = ({
  addFavouriteOffer
}: {
  addFavouriteOffer: AddFavouriteOffer;
}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body as PostFavouriteOfferBody;
      const result = await addFavouriteOffer.execute({ data });

      res.send(result);
    } catch (err) {
      next(err);
    }
  };
};

export default makePostFavouriteOffer;
