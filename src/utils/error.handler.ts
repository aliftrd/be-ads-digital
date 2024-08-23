import { NextFunction, Request, Response } from 'express';
import HTTPException from './exception/http.exception';
import { error } from 'console';
import { ZodError } from 'zod';

export const errorHandler = (
  err: Error | HTTPException | ZodError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  error(err);
  if (err instanceof Error) {
    error('stack : ', err.stack);
  }

  if (err instanceof HTTPException) {
    console.log(err.cause);

    return res.status(err.code).json({
      message: err.message,
      cause: err.cause,
    });
  }

  return res
    .status(500)
    .json({ message: err.message || 'Internal server error' });
};
