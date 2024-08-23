import * as CategoryRepository from './category.repositoy';
import * as CategorySchema from './category.schema';

export async function get() {
  const categories = await CategoryRepository.findAll();

  return { data: categories };
}

export async function create(payload: CategorySchema.Create) {
  const category = await CategoryRepository.create({ ...payload });

  return { message: 'new category has been created', data: category };
}

export async function update(id: number, payload: CategorySchema.Update) {
  await CategoryRepository.update(id, payload);

  return { message: 'category has been updated' };
}

export async function destroy(id: number) {
  await CategoryRepository.destroy(id);
  return { message: 'category has been deleted' };
}
