import * as StudentDAL from "../../modules/student/StudentDAL";

export async function getInfoStudentLogin(email: string) {
  const result = await StudentDAL.getInfoStudentLogin(email);
  return result;
}

export async function updateStudentToken(studentId: any, refresh_token: string) {
  const result = await StudentDAL.updateStudentToken(studentId, refresh_token);
  return result;
}

export async function createStudent(dpmId: any, campusId: any, name: string, address: string, phone: any, email: string, active: any) {
  const result = await StudentDAL.createStudent(dpmId,campusId,name,address,phone,email,active);
  return result;
}

export async function getStudent(studentId: any, name: string) {
  const result = await StudentDAL.getStudent(studentId,name);
  return result;
}

export async function getStudentInfoByEmail(email: string) {
  const result = await StudentDAL.getStudentInfoByEmail(email);
  return result;
}
