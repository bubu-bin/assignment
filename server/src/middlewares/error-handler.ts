import { Request, Response, NextFunction } from 'express';
import { ApplicationError } from '../handlers/ApplicationError';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApplicationError) {
    return res.status(err.statusCode).send(err.message);
  }

  return res.status(500).send(err.message);
};

export { errorHandler };
