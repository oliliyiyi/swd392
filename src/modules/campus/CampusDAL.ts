import * as CampusSQL from '../../modules/campus/campusSQL';
import {db, queryDB} from '../../configs/db_config';

export async function getAllCampus() {
    const queryString = CampusSQL.getAllListCampus();
    // const rows = await db.query(queryString.text, async (err, data) => {
    //     if(err) {
    //         console.error(err);
    //         return;
    //     }
        
    // });
    const rows = await queryDB(queryString);
    return rows;
}