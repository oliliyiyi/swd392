import * as StudentSQL from "../../modules/student/studentSQL";
import { query } from "../../configs/db_config";

export async function getAcountStudentLogin(account: string, password: string) {
  // const queryString = StudentSQL.getAcountStudentLogin(account, password);
  // const rows = await query(queryString.text, queryString.values);
  return;
}

export async function getStudentInfoByEmail(email: string) {
  const queryString = StudentSQL.getStudentInfoByEmail(email);
  const rows = await query(queryString.text, queryString.values);
  return rows;
}

export async function getInfoStudentLogin(email: string) {
  const queryString = StudentSQL.getStudentInfoByEmail(email);
  const rows = await query(queryString.text, [queryString.values]);
  return rows;
}

export async function updateStudentToken(studentId: any, refresh_token: string) {
  const queryString = StudentSQL.updateStudentToken(studentId, refresh_token);
  const rows = await query(queryString.text, queryString.values);
  return rows;
}

export async function createStudent(dpmId: any, campusId: any, name: string, address: string, phone: any, email: string, active: any) {
  const queryString = StudentSQL.createStudent(dpmId, campusId, name, address, phone, email, active);
  const rows = await query(queryString.text, queryString.values);
  return rows;
}

export async function getStudent(studentId: any, name: string) {
  const queryString =  StudentSQL.getStudent(studentId, name);
  const rows = await query(queryString.text, [queryString.values]);
  return rows;
}
