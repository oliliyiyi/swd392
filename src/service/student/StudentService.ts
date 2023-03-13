import moment from "moment";
import * as StudentDAL from "../../modules/student/StudentDAL";
export async function updateStudentToken(
  studentId: any,
  refresh_token: string,
  device_token: string
) {
  const result = await StudentDAL.updateStudentToken(studentId, refresh_token, device_token);
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
  result.birthday = moment(result.birthday).format('YYYY-MM-DD');
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

export async function updateStudentInfo(student_id: number, phone: string, address: string, birthday: string) {
  const result = await StudentDAL.updateStudentInfo(student_id, phone, address, birthday);
  return result;
}
