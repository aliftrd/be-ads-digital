import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

/********** SCHEMA **********
 * @Table categories
 * @PrimaryKey id
 * @Fields id, name
 */
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export type SelectCategories = typeof categories.$inferSelect;
export type InsertCategories = typeof categories.$inferInsert;

/********** SCHEMA **********
 * @Table products
 * @PrimaryKey id
 * @Fields id, name, slug, price, category_id
 */
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  slug: varchar('slug').notNull(),
  price: integer('price').notNull(),
  category_id: integer('category_id').notNull(),
});

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.category_id],
    references: [categories.id],
  }),
  product_assets: many(productAssets),
}));

export type SelectProducts = typeof products.$inferSelect;
export type InsertProducts = typeof products.$inferInsert;

/********** SCHEMA **********
 * @Table product_assets
 * @PrimaryKey id
 * @Fields id, product_id, image
 */
export const productAssets = pgTable('product_assets', {
  id: serial('id').primaryKey(),
  product_id: integer('product_id').notNull(),
  image: varchar('image').notNull(),
});

export const productAssetsRelations = relations(productAssets, ({ one }) => ({
  product: one(products, {
    fields: [productAssets.product_id],
    references: [products.id],
  }),
}));

export type SelectProductAssets = typeof productAssets.$inferSelect;
export type InsertProductAssets = typeof productAssets.$inferInsert;
