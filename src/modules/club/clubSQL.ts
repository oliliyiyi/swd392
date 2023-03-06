export function getAllClubsInCampus(campus_id: number) {
    const query = `SELECT tl.club_id, tl.campus_id, tl.name, tl.abbreviation, tl.established_date, COUNT(tb.student_id) as totalMembers FROM 
    (SELECT * FROM clubs WHERE campus_id = ?) tl
    LEFT JOIN club_member tb
    ON tl.club_id = tb.club_id
    GROUP BY tl.club_id, tl.campus_id, tl.name, tl.abbreviation, tl.established_date;`;
    const values: any = [campus_id];
    const queryObject = {
      text: query,
      values,
    };
    return queryObject;
  }
  
export function getClubMemberInfo(club_id: number, student_id: number) {
  const query = `SELECT student_id, club_id, role, join_date 
  FROM club_member WHERE student_id = ? AND club_id = ?;`;
  const values: any = [club_id, student_id];
    const queryObject = {
      text: query,
      values,
    };
    return queryObject;
}

export function insertClubMember(student_id: number, club_id: number, role: string, join_date: string) {
  const query = `INSERT INTO club_member (student_id, club_id, role, join_date) VALUES (?,?,?,?);`;
  const values: any = [student_id, club_id, role, join_date];
    const queryObject = {
      text: query,
      values,
    };
    return queryObject;
}