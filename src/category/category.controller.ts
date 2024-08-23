import { Request, Response, Router } from 'express';
import * as CategoryService from './category.service';
import { validate } from './../lib';
import * as CategorySchema from './category.schema';
const category = Router();

category.get('/category', async (req: Request, res: Response) => {
  const resp = await CategoryService.get();

  return res.json(resp);
});

category.post(
  '/category',
  validate('json', CategorySchema.create),
  async (req: Request, res: Response) => {
    const payload: CategorySchema.Create = req.body;

    const resp = await CategoryService.create(payload);

    return res.json(resp);
  },
);

category.put(
  '/category/:id',
  [
    validate('param', CategorySchema.idParam),
    validate('json', CategorySchema.update),
  ],
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;

    const resp = await CategoryService.update(parseInt(id), payload);

    return res.json(resp);
  },
);

category.delete(
  '/category/:id',
  validate('param', CategorySchema.idParam),
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const resp = await CategoryService.destroy(parseInt(id));

    return res.json(resp);
  },
);

export default category;
