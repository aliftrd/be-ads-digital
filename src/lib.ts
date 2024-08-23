import { NextFunction, Request, Response } from 'express';
import type { ZodSchema } from 'zod';
import HTTPException from './utils/exception/http.exception';

export type ValidationTargets = {
  json: any;
  param: Record<string, string> | Record<string, string | undefined>;
};

export const validate = <T>(
  type: keyof ValidationTargets,
  schema: ZodSchema<T>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(type == 'param' ? req.params : req.body);

    if (!result.success) {
      const errors = result.error.issues.map((err) => {
        const key = err.path[err.path.length - 1];
        return { [key]: err.message };
      });

      throw new HTTPException(400, 'validator error', errors);
    }

    if (type === 'json') {
      req.body = result.data;
    }

    next();
  };
};
