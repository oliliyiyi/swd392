import * as ClubSQL from "../../modules/club/clubSQL";
import { query } from "../../configs/db_config";

export async function getAllClubsInCampus(campus_id: number) {
  const queryString = ClubSQL.getAllClubsInCampus(campus_id);
  const rows = await query(queryString.text, queryString.values);
  return rows;
}

export async function getClubMemberInfo(club_id: number, student_id: number) {
  const queryString = ClubSQL.getClubMemberInfo(club_id, student_id);
  const rows = await query(queryString.text, queryString.values);
  return rows;
}

export async function insertClubMember(
  student_id: number,
  club_id: number,
  role: string, 
  join_date: string
) {
  if (join_date === ''){
    const now = new Date();
    join_date = now.toISOString().slice(0, 10);
  }
  const queryString = ClubSQL.insertClubMember(student_id, club_id, role, join_date);  
  const rows = await query(queryString.text, queryString.values);
  return rows;
}
