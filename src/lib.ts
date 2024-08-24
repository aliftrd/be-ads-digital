import { NextFunction, Request, Response } from 'express';
import type { ZodSchema } from 'zod';
import HTTPException from './utils/exception/http.exception';

export type ValidationTargets = {
  json: any;
  form: Record<string, string | File>;
  query: Record<string, string | string[]>;
  param: Record<string, string> | Record<string, string | undefined>;
};

export const validate = <T>(
  type: keyof ValidationTargets,
  schema: ZodSchema<T>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let data;

    if (type === 'param') {
      data = req.params;
    } else if (type === 'form') {
      data = {
        ...req.body,
        file: req.file,
      };
    } else if (type === 'query') {
      data = req.query;
    } else {
      data = req.body;
    }

    const result = schema.safeParse(data);

    if (!result.success) {
      const errorMap: Record<string, string> = {};

      result.error.issues.forEach((err) => {
        const key = err.path[err.path.length - 1];
        if (!errorMap[key]) {
          errorMap[key] = err.message;
        }
      });

      const formattedErrors = Object.entries(errorMap).map(
        ([key, message]) => ({
          [key]: message,
        }),
      );

      throw new HTTPException(400, 'validator error', formattedErrors);
    }

    if (type === 'json' || type === 'form') {
      req.body = result.data;
    }

    next();
  };
};
