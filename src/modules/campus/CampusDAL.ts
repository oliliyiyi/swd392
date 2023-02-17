import * as CampusSQL from "../../modules/campus/campusSQL";
import { query } from "../../configs/db_config";

export async function getAllCampus() {
  const queryString = CampusSQL.getAllCampus();
  const rows = await query(queryString.text, queryString.values);
  return rows;
}
