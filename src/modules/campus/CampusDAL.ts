import * as CampusSQL from '../../modules/campus/campusSQL';
import {db} from '../../configs/db_config';

export async function getAllCampus() {
    const queryString = CampusSQL.getAllListCampus();
    const rows = await db.query(queryString);
    return rows;
}