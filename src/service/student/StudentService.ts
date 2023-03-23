import moment from "moment";
import * as StudentDAL from "../../modules/student/StudentDAL";
import * as commonFunction from "../../modules/commonFunction";
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
  const now = new Date();
  const date = await commonFunction.getStartAndEndDates(now);
  let pointStudent = await StudentDAL.getStudentPoint(studentId, date.start_date, date.end_date);
  if(pointStudent){
    result['point'] = pointStudent.point;
  } else {
    result['point'] = 0
  }
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

export async function updateStudentInfo(student_id: number, img:string, phone: string, address: string, birthday: string) {
  const result = await StudentDAL.updateStudentInfo(student_id, img, phone, address, birthday);
  return result;
}

export async function getStudentPoint(student_id: number) {
  const now = new Date();
  const date = await commonFunction.getStartAndEndDates(now);
  let result = await StudentDAL.getStudentPoint(student_id, date.start_date, date.end_date);
  if(result){
    result['semester'] = date.semester;
    return result;
  } else {
    return{student_id, 'point': 0, 'semester' : date.semester};
  }
}

export async function getTopStudentsPointInCampus(campus_id: number) {
  const now = new Date();
  const date = await commonFunction.getStartAndEndDates(now);
  const result = await StudentDAL.getTopStudentsPointInCampus(campus_id, date.start_date, date.end_date);
  return {result, 'semester': date.semester};
}
