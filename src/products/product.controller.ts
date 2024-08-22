import { Request, Response } from 'express';
import { tryit } from 'radash';
import { db } from './../db';

export const getAllProduct = async (req: Request, res: Response) => {
  const [err, categories] = await tryit(async () =>
    db.query.categories.findMany(),
  )();

  return res.json({
    data: categories,
  });
};
