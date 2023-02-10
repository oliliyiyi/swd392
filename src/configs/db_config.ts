import mysql, { Connection } from "mysql2";
import * as dotenv from "dotenv";
dotenv.config();

const db = mysql.createPool({
  host: "us-cdbr-east-06.cleardb.net",
  user: "bd11f6f55a584d",
  password: "f125189f",
  database: "heroku_a1e82bf2ce3982a",
  port: 3306,
});

export async function query(sql: string) {
  return new Promise((resolve, rejects) => {
    db.query(sql, function (err, results, fields) {
      if (err) {
        return rejects(err);
      }
      return resolve(results);
    });
  });
}
