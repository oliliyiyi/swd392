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

export function updateStudentToken(studentId: any, refresh_token: string) {
  const query = `UPDATE student SET token = ? WHERE student_id = ?`;
  const values: any = [refresh_token, studentId];
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
