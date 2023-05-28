/* eslint-disable unused-imports/no-unused-vars */
import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  // TODO: provide more meaningful way of serving the errors
  return res.status(500).send(`Internal server error`);
};

export { errorHandler };
