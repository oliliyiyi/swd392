import * as EventSQL from "../../modules/event/eventSQL";
import { query } from "../../configs/db_config";

export async function admInsertEvent( 
    name: string,
    email: string,
    location: string,
    point: number,
    img: string,
    start_date: string,
    end_date: string
    ) {
  const queryString = EventSQL.admInsertEvent(name, email, location, point, img, start_date, end_date);
  const rows = await query(queryString.text, queryString.values);
  return;
}
