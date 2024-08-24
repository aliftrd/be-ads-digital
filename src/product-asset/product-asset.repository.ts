import { tryit } from 'radash';
import { db } from './../db';
import { InsertProductAssets, productAssets } from './../schema';
import HTTPException from './../utils/exception/http.exception';
import { eq } from 'drizzle-orm';

export async function findAll() {
  const [err, items] = await tryit(
    async () =>
      await db.query.productAssets.findMany({
        columns: {
          id: true,
          image: true,
        },
        with: { product: true },
      }),
  )();

  if (err) {
    throw new HTTPException(500, 'failed to find all product assets');
  }

  return items;
}

export async function create(data: InsertProductAssets) {
  const [err, item] = await tryit(
    async () => await db.insert(productAssets).values(data).returning(),
  )();

  if (err) {
    throw new HTTPException(500, 'failed to create product assets');
  }

  return item;
}

export async function update(id: number, data: Partial<InsertProductAssets>) {
  const [err] = await tryit(
    async () => await db.update(productAssets).set(data),
  )();

  if (err) {
    throw new HTTPException(500, 'failed to update product assets');
  }
}

export async function destroy(id: number) {
  const [err] = await tryit(
    async () => await db.delete(productAssets).where(eq(productAssets.id, id)),
  )();

  if (err) {
    throw new HTTPException(500, 'failed to delete product assets');
  }
}
