import { Response, Request, NextFunction } from 'express';
import { AddForm } from '../use-cases/add-form';

export type PostFormBody = any;

const makePostForm = ({ addForm }: { addForm: AddForm }) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body as PostFormBody;
      const result = await addForm.execute({ data });

      res.send(result);
    } catch (err) {
      next(err);
    }
  };
};

export default makePostForm;
