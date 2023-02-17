import * as StudentSQL from "../../modules/student/studentSQL";
import { query } from "../../configs/db_config";

export async function getAcountStudentLogin(account: string, password: string) {
  const queryString = StudentSQL.getAcountStudentLogin(account, password);
  const rows = await query(queryString.text, queryString.values);
  return rows;
}
