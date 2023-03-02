import * as ClubService from '../../service/club/ClubService';
import { db } from "../../configs/db_config";

export async function getAllClubsInCampus(req: any, res: any, next: any){
    try{
        const campus_id = req.query.campus_id;
        const response = await ClubService.getAllClubsInCampus(campus_id);
        res.json(response);
    } catch (error) {
        return next(error);
    }
}

export async function insertClubMember(req: any, res: any, next: any){
    try {
        await db.query("START TRANSACTION");
        const student_id = req.body.student_id;
        const club_id = req.body.club_id;
        const role = req.body.role;
        const join_date = req.body?.join_date || '';
        const response = await ClubService.insertClubMember(student_id, club_id, role, join_date);
        await db.query("COMMIT");
        res.json(response);
      } catch (error: any) {
        await db.query("ROLLBACK");
        res.status(400).json({message: "Action Fail"});
      }
}