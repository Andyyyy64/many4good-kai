import { Pool, PoolClient } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool: Pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
    ssl: true
})

pool.connect();

export default {
    get: async (query: string, params?: Array<string | number | boolean | null>) => {
        let db: PoolClient | null = null;
        try {
          db = await pool.connect();
          const result = await db.query(query, params);
          return result.rows[0];
        } catch (error) {
          console.error('Failed to execute query:', query, error);
          return null;
        } finally {
          if (db) {
            db.release();
          }
        }
      },
    
      all: async (query: string, params?: Array<string | number | boolean | null>) => {
        let db: PoolClient | null = null;
        try {
          db = await pool.connect();
          const result = await db.query(query, params);
          return result.rows;
        } catch (error) {
          console.error('Failed to execute query:', query, error);
          return null;
        } finally {
          if (db) {
            db.release();
          }
        }
      },
    
      run: async (query: string, params?: Array<string | number | boolean | null>) => {
        let db: PoolClient | null = null;
        try {
          db = await pool.connect();
          await db.query(query, params);
          return true;
        } catch (error) {
          console.error('Failed to execute query:', query, error);
          return false;
        } finally {
          if (db) {
            db.release();
          }
        }
    },
};
