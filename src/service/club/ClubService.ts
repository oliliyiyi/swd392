import * as ClubDAL from '../../modules/club/ClubDAL';

export async function getAllClubsInCampus(campus_id: number){
    const result = await ClubDAL.getAllClubsInCampus(campus_id);
    return result;
}

export async function insertClubMember(student_id: number, club_id: number, role: string, join_date: string){
    const result = await ClubDAL.insertClubMember(student_id, club_id, role, join_date);
    return result;
}

export async function getAllClubMembers(club_id: number){
    const result = await ClubDAL.getAllClubMembers(club_id);
    return result;
}

export async function getAllClubsStudentJoin(student_id: number){
    const result = await ClubDAL.getAllClubsStudentJoin(student_id);
    return result;
}

export async function getClubInfoByClubId(club_id: number){
    const result = await ClubDAL.getClubInfoByClubId(club_id);
    return result[0];
}

export async function deleteClubMember(student_id: number, club_id: number){
    const clubMems = await getAllClubMembers(club_id);
    let checkMem = false
    clubMems.forEach((mem: any) => {
        if(mem.student_id === student_id){
            checkMem = true;
        }
    });
    if(!checkMem){
        throw new Error("NotBeClubeMember")
    }
    const result = await ClubDAL.deleteClubMember(student_id, club_id);
    return result;
}