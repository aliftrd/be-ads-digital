import { tryit } from 'radash';
import { db } from './../db';
import HTTPException from './../utils/exception/http.exception';
import { InsertProducts, products } from './../schema';
import { eq } from 'drizzle-orm';

export async function findAll(price: string = 'asc') {
  const [err, products] = await tryit(
    async () =>
      await db.query.products.findMany({
        orderBy: (products, { asc, desc }) => [
          price === 'asc' ? asc(products.price) : desc(products.price),
        ],
        columns: {
          id: true,
          name: true,
          slug: true,
          price: true,
        },
        with: { category: true, product_assets: true },
      }),
  )();

  if (err) {
    console.log(err);

    throw new HTTPException(500, 'failed to find all products');
  }

  return products;
}

export async function create(data: InsertProducts) {
  const [err, product] = await tryit(async () =>
    db.insert(products).values(data).returning(),
  )();

  if (err) {
    throw new HTTPException(500, 'failed to create product');
  }

  return product;
}

export async function update(id: number, newData: Partial<InsertProducts>) {
  const [err] = await tryit(async () =>
    db.update(products).set(newData).where(eq(products.id, id)),
  )();

  if (err) {
    throw new HTTPException(500, 'failed to update product');
  }
}

export async function destroy(id: number) {
  const [err] = await tryit(async () =>
    db.delete(products).where(eq(products.id, id)),
  )();

  if (err) {
    throw new HTTPException(500, 'failed to delete product');
  }
}
