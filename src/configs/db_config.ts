import mysql, { Connection } from "mysql2";
import * as dotenv from "dotenv";
dotenv.config();

export const db = mysql.createPool({
  host: "us-cdbr-east-06.cleardb.net",
  user: "bd11f6f55a584d",
  password: "f125189f",
  database: "heroku_a1e82bf2ce3982a",
  port: 3306
})
export async function queryDB(query: any) {
  const result = await db.query(query)
  return result;
}

// export const db = conn.getConnection((err: any) => {
//   if(err){
//     console.log(err);
//   }
// });