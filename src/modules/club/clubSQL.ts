export function getAllClubsInCampus(campus_id: number) {
    const query = `SELECT tl.club_id, tl.campus_id, tl.name, tl.abbreviation, tl.established_date, tl.img, COUNT(tb.student_id) as totalMembers FROM 
    (SELECT * FROM clubs WHERE campus_id = ?) tl
    LEFT JOIN club_member tb
    ON tl.club_id = tb.club_id
    GROUP BY tl.club_id, tl.campus_id, tl.name, tl.abbreviation, tl.established_date, tl.img;`;
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

export function getAllClubMembers(club_id: number) {
  const query = `SELECT td.student_id, td.name as student_name, tf.name as campus_name, tk.name as dpm_name,
  td.address, td.phone, td.email, td.role 
  FROM (SELECT * FROM club_member WHERE club_id = ?) tb
  LEFT JOIN clubs tl
  ON tb.club_id = tl.club_id
  LEFT JOIN student td
  ON tb.student_id = td.student_id
  LEFT JOIN department tk
  ON tk.dpm_id = td.dpm_id
  LEFT JOIN campus tf
  ON tf.campus_id = td.campus_id`;
  const values: any = [club_id];
    const queryObject = {
      text: query,
      values,
    };
    return queryObject;
}

export function getAllClubsStudentJoin(student_id: number) {
  const query = `SELECT  tl.club_id, tl.name as club_name, tl.abbreviation, tl.established_date, tl.img 
  FROM (SELECT * FROM club_member WHERE student_id = ?) tb
  LEFT JOIN clubs tl
  ON tb.club_id = tl.club_id`;
  const values: any = [student_id];
    const queryObject = {
      text: query,
      values,
    };
    return queryObject;
}

export function getClubInfoByClubId(club_id: number) {
  const query = `SELECT club_id, name as club_name, abbreviation, established_date, img 
  FROM clubs WHERE club_id = ?`;
  const values: any = [club_id];
    const queryObject = {
      text: query,
      values,
    };
    return queryObject;
}