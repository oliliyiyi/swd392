import * as StudentDAL from "../../modules/student/StudentDAL";

export async function getAcountStudentLogin(account: string, password: string) {
  const result = await StudentDAL.getAcountStudentLogin(account, password);
  return result;
}

export async function getStudentInfoByEmail(email: string) {
  const result = await StudentDAL.getStudentInfoByEmail(email);
  return result;
}
