import { Response, Request, NextFunction } from 'express';
import { ListUserFavourites } from '../use-cases/list-user-favourites';

const makeGetUserFavourites = ({
  listUserFavourites
}: {
  listUserFavourites: ListUserFavourites;
}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await listUserFavourites.execute();

      res.send(result);
    } catch (err) {
      next(err);
    }
  };
};

export default makeGetUserFavourites;
