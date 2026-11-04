import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  decimal,
  timestamp,
} from 'drizzle-orm/pg-core';
import { users } from './users.schema.js';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),

  title: varchar('title', { length: 255 }).notNull(),

  description: text('description'),

  price: decimal('price', { precision: 10, scale: 2 }).notNull(),

  stock: integer('stock').notNull().default(0),

  createdAt: timestamp('created_at').defaultNow().notNull(),

  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  sellerId: integer('seller_id').notNull().references(() => users.id),
});


export type Product = typeof products.$inferSelect;

export type newProduct = typeof products.$inferInsert;