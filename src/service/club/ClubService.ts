import * as ClubDAL from '../../modules/club/ClubDAL';

export async function getAllClubsInCampus(campus_id: number){
    const result = await ClubDAL.getAllClubsInCampus(campus_id);
    return result;
}

export async function insertClubMember(student_id: number, club_id: number, role: string, join_date: string){
    const result = await ClubDAL.insertClubMember(student_id, club_id, role, join_date);
    return result;
}