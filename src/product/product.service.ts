import * as ProductRepository from './product.repository';
import * as ProductSchema from './product.schema';
import { kebabCase } from 'lodash';
import { nanoid } from 'nanoid';

export async function get() {
  const products = await ProductRepository.findAll();

  return { data: products };
}

export async function create(payload: ProductSchema.Create) {
  const slug = `${kebabCase(payload.name)}-${nanoid(6)}`;
  const product = await ProductRepository.create({
    ...payload,
    slug: slug,
  });

  return { message: 'new product has been created', data: product };
}

export async function update(id: number, payload: ProductSchema.Update) {
  const slug = `${kebabCase(payload.name)}-${nanoid(6)}`;
  await ProductRepository.update(id, {
    ...payload,
    slug: slug,
  });

  return { message: 'product has been updated' };
}

export async function destroy(id: number) {
  await ProductRepository.destroy(id);

  return { message: 'product has beed deleted' };
}
