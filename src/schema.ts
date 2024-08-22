import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

/********** SCHEMA **********
 * @Table categories
 * @PrimaryKey id
 * @Fields id, name
 */

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
});

export type SelectCategories = typeof categories.$inferSelect;
export type InsertCategories = typeof categories.$inferInsert;
