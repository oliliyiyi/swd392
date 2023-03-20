export function getStudentInfoByEmail(email: string) {
  const query = `SELECT st.student_id, st.name as student_name, st.address, st.phone, st.role, st.email, st.birthday, cp.campus_id, cp.name as campus_name
  FROM student st
  inner JOIN campus cp
  ON st.campus_id = cp.campus_id
  WHERE st.email = ?`;
  const values: any = [email];
  const queryObject = {
    text: query,
    values,
  };
  return queryObject;
}

export function getAllStudentInfo() {
  const query = `SELECT st.student_id, st.name, st.address, st.phone, st.role, st.email, st.birthday
  FROM student st
  Where st.active = 1`;
  const values: any = [];
  const queryObject = {
    text: query,
    values,
  };
  return queryObject;
}

export function updateStudentToken(studentId: any, refresh_token: string, device_token: string) {
  const query = `UPDATE student SET token = ? , deviceToken = ? WHERE student_id = ?`;
  const values: any = [refresh_token, device_token, studentId];
  const queryObject = {
    text: query,
    values,
  };
  return queryObject;
}

export function createStudent(
  dpmId: any,
  campusId: any,
  name: string,
  address: string,
  phone: any,
  email: string,
  role: string,
  active: any
) {
  const query = `INSERT INTO student (dpm_id, campus_id, name, address, phone, email, role, active)
    VALUES (?,?,?,?,?,?,?,?)`;
  const values: any = [
    dpmId,
    campusId,
    name,
    address,
    phone,
    email,
    role,
    active,
  ];
  const queryObject = {
    text: query,
    values,
  };
  return queryObject;
}

export function getStudentByStudentId(studentId: any) {
  const query = `SELECT * FROM student WHERE student_id = ?`;
  const values: any = [studentId];
  const queryObject = {
    text: query,
    values,
  };
  return queryObject;
}

export function updateStudentInfo(student_id: number, img:string, phone: string, address: string, birthday: string) {
  const query = `UPDATE student SET student_img = ?, phone = ? , address = ? , birthday = ? WHERE student_id = ? ;`;
  const values: any = [img, phone, address, birthday, student_id];
  const queryObject = {
    text: query,
    values,
  };
  return queryObject;
}

export function getStudentPoint(student_id: number, start_date: string, end_date: string) {
  const query = `SELECT student_id, SUM(point_num) as point, COUNT(point_num) as totalEvent FROM point WHERE student_id = ? AND created_at >= ? 
  AND created_at <= ? AND active = 1 GROUP BY student_id`;
  const values: any = [student_id, start_date, end_date];
  const queryObject = {
    text: query,
    values,
  };
  return queryObject;
}

export function getTopStudentsPointInCampus(campus_id: number, start_date: string, end_date: string) {
  const query = `SELECT tl.student_id, tl.name as student_name, td.name as campus_name, SUM(tb.point_num) as point,
  COUNT(tb.point_num) as totalEvent
  FROM (SELECT * FROM student where campus_id = ?) tl
  INNER JOIN point tb
  ON tl.student_id = tb.student_id
  LEFT JOIN campus td
  ON tl.campus_id = td.campus_id
  WHERE tb.created_at >= ? AND tb.created_at <= ? AND tb.active = 1 
  GROUP BY tl.student_id, student_name, campus_name
  ORDER BY point DESC
  LIMIT 10`;
  const values: any = [campus_id, start_date, end_date];
  const queryObject = {
    text: query,
    values,
  };
  return queryObject;
}