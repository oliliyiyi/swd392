import * as StudentService from "../../service/student/StudentService";
import { db } from "../../configs/db_config";

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

export async function getAllStudentInfo(req: any, res: any, next: any) {
  try {

    const response = await StudentService.getAllStudentInfo();
    return res.json(response);
  } catch (error) {
    return next(error);
  }
}

export async function updateStudentInfo(req: any, res: any, next: any) {
  try {
    await db.query("START TRANSACTION");
    const student_id = Number(req.params.student_id);
    const address = req.body.address;
    const phone = req.body.phone;
    const birthday = req.body.birthday;
    const response = await StudentService.updateStudentInfo(student_id, phone, address, birthday);
    await db.query("COMMIT");
    res.json(response);
  } catch (error: any) {
    await db.query("ROLLBACK");
    res.status(400).json({message: "Action Fail"});
  }
}

