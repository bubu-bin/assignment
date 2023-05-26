import { Response, Request, NextFunction } from 'express';
import { ListProductCategories } from '../use-cases/list-product-categories';

const makeGetProductCategories = ({
  listProductCategories
}: {
  listProductCategories: ListProductCategories;
}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await listProductCategories.execute();

      res.send(result);
    } catch (err) {
      next(err);
    }
  };
};

export default makeGetProductCategories;
