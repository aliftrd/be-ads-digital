import { tryit } from 'radash';
import { db } from './../db';
import { categories, InsertCategories } from './../schema';
import { eq } from 'drizzle-orm';
import HTTPException from './../utils/exception/http.exception';

export async function findAll() {
  const [err, categories] = await tryit(async () =>
    db.query.categories.findMany(),
  )();

  if (err) {
    throw new HTTPException(500, 'failed to find all categories');
  }

  return categories;
}

export async function create(data: InsertCategories) {
  const [err, category] = await tryit(async () =>
    db.insert(categories).values(data).returning(),
  )();

  if (err) {
    throw new HTTPException(500, 'failed to create category');
  }

  return category;
}

export async function update(id: number, newData: Partial<InsertCategories>) {
  const [err] = await tryit(async () =>
    db.update(categories).set(newData).where(eq(categories.id, id)),
  )();

  if (err) {
    throw new HTTPException(500, 'failed to update category');
  }
}

export async function destroy(id: number) {
  const [err] = await tryit(async () =>
    db.delete(categories).where(eq(categories.id, id)),
  )();

  if (err) {
    throw new HTTPException(500, 'failed to delete category');
  }
}
