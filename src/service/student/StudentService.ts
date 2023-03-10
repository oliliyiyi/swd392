import * as StudentDAL from "../../modules/student/StudentDAL";
export async function updateStudentToken(
  studentId: any,
  refresh_token: string
) {
  const result = await StudentDAL.updateStudentToken(studentId, refresh_token);
  return result;
}

export async function createStudent(
  dpmId: any,
  campusId: any,
  name: string,
  address: string,
  phone: any,
  email: string,
  role: string,
  active: any
) {
  const result = await StudentDAL.createStudent(
    dpmId,
    campusId,
    name,
    address,
    phone,
    email,
    role,
    active
  );
  return result;
}

export async function getStudentByStudentId(studentId: any) {
  const result = await StudentDAL.getStudentByStudentId(studentId);
  return result;
}

export async function getStudentInfoByEmail(email: string) {
  const result = await StudentDAL.getStudentInfoByEmail(email);
  return result;
}

export async function getAllStudentInfo() {
  const result = await StudentDAL.getAllStudentInfo();
  return result;
}
