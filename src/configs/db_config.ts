import { Pool } from "pg";
import { envConfig } from "./env_config";

const pool = new Pool({ connectionString: envConfig.PG_CONNECTION_STRING });

async function query(text: any) {
  const { rows } = await pool.query(text);
  return rows;
}

export const db = {
  query,
};
