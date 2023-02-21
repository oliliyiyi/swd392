export function getStudentInfoByEmail(email: string) {
  const query = `SELECT student_id, dpm_id, campus_id, name, address, phone, token FROM student WHERE email = ?`;
  const values: any = [email];
  const queryObject = {
    text: query,
    values,
  };
  return queryObject;
}
