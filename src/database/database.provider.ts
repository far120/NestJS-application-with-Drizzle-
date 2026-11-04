import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { products } from './schema/product.schema.js';
import { users } from './schema/users.schema.js';
import {
  userrelations,
  productrelations,
} from './schema/relations.js';

export const DATABASE = 'DATABASE';

export const databaseProvider = {
  provide: DATABASE,
  useFactory: () => {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    return drizzle({
      client: pool,
      schema: {
        products,
        users,
        userrelations,
        productrelations,
      },
    });
  },
};

export type Database = ReturnType<typeof databaseProvider.useFactory>;