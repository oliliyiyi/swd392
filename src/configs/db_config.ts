import mysql, { Connection } from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();

export const db = mysql.createPool({
  host: "us-cdbr-east-06.cleardb.net",
  user: "b7cb6abdc6e09c",
  password: "c1ca7b98",
  database: "heroku_dc76636fca04c0f",
  port: 3306,
});


export async function query(sql: string, values: any) {
  let connection: any;
  try {
    connection = await db.getConnection();
    const [rows, fields] = await connection.query(sql, values);
    return rows;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  } finally {
    if (connection) {
      if (typeof connection.release === 'function') {
        connection.release();
      }
    }
  }
}
// export async function query1(sql: string, val: any) {

//   return new Promise((resolve, rejects) => {
//     db.query(sql, val, function (err, results, fields) {
//       if (err) {
//         return rejects(err);
//       }
//       return resolve(results);
//     });
//   });
// }
