import 'dotenv/config';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()');

    console.log('Database Connected!');
    console.log(result.rows[0]);
  } catch (error) {
    console.error('Database Connection Failed:', error);
  } finally {
    await pool.end();
  }
}

testConnection();