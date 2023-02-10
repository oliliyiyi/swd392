import * as CampusSQL from "../../modules/campus/campusSQL";
import { query } from "../../configs/db_config";

export async function getAllCampus() {
  const queryString = CampusSQL.getAllListCampus();
  const rows = await query("SELECT * FROM campus");
  return rows;
}
