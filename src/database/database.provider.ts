import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';


export const DATABASE = 'DATABASE';

export const databaseProvider = {
  provide: DATABASE,
  useFactory: () => {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    return drizzle({ client: pool });
  },
};

export type Database = ReturnType<typeof drizzle>;