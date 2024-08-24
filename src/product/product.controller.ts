import { Request, Response, Router } from 'express';
import { validate } from './../lib';
import * as ProductService from './product.service';
import * as ProductSchema from './product.schema';
const product = Router();

product.get('/product', async (req: Request, res: Response) => {
  const resp = await ProductService.get();

  return res.json(resp);
});

product.post(
  '/product',
  validate('json', ProductSchema.create),
  async (req: Request, res: Response) => {
    const payload = req.body;

    const resp = await ProductService.create(payload);

    return res.json(resp);
  },
);

product.put(
  '/product/:id',
  [
    validate('param', ProductSchema.idParam),
    validate('json', ProductSchema.update),
  ],
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;

    const resp = await ProductService.update(parseInt(id), payload);

    return res.json(resp);
  },
);

product.delete(
  '/product/:id',
  validate('param', ProductSchema.idParam),
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const resp = await ProductService.destroy(parseInt(id));

    return res.json(resp);
  },
);

export default product;
