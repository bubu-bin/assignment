import { Response, Request, NextFunction } from 'express';
import { EditForm } from '../use-cases/edit-form';

// TODO: maybe to seperate file with all types
export type PatchFormBody = any;

const makePatchForm = ({ editForm }: { editForm: EditForm }) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body as PatchFormBody;
      const result = await editForm.execute(data);

      res.send(result);
    } catch (err) {
      next(err);
    }
  };
};

export default makePatchForm;
