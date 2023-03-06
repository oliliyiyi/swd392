import * as StudentService from "../../service/student/StudentService";

export async function getStudentInfoByEmail(req: any, res: any, next: any) {
  try {
    const email = req.query.email;
    const response = await StudentService.getStudentInfoByEmail(email);
    res.json(response);
  } catch (error) {
    return next(error);
  }
}

export async function getStudentByStudentId(req: any, res: any, next: any) {
  try {
    const student_id = req.params.student_id as number;
    const response = await StudentService.getStudentByStudentId(student_id);
    res.json(response);
  } catch (error) {
    return next(error);
  }
}
