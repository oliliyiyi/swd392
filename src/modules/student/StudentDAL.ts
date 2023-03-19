import * as StudentSQL from "../../modules/student/studentSQL";
import { query } from "../../configs/db_config";

export async function getStudentInfoByEmail(email: string) {
  const queryString = StudentSQL.getStudentInfoByEmail(email);
  const rows = await query(queryString.text, queryString.values);
  return rows[0];
}

export async function updateStudentToken(
  studentId: any,
  refresh_token: string,
  device_token: string

) {
  const queryString = StudentSQL.updateStudentToken(studentId, refresh_token, device_token);
  const rows = await query(queryString.text, queryString.values);
  return rows;
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
  const queryString = StudentSQL.createStudent(
    dpmId,
    campusId,
    name,
    address,
    phone,
    email,
    role,
    active
  );
  const rows = await query(queryString.text, queryString.values);
  return rows;
}

export async function getStudentByStudentId(studentId: any) {
  const queryString = StudentSQL.getStudentByStudentId(studentId);
  const rows = await query(queryString.text, queryString.values);
  return rows[0];
}

export async function getAllStudentInfo() {
  const queryString = StudentSQL.getAllStudentInfo();
  const rows = await query(queryString.text, [queryString.values]);
  return rows;
}

export async function updateStudentInfo(student_id: number, img:string, phone: string, address: string, birthday: string) {
  const queryString = StudentSQL.updateStudentInfo(student_id, img, phone, address, birthday);
  const rows = await query(queryString.text, queryString.values);
  return rows;
}