import * as NotifyService from "../../service/notify/NotifyService";

export async function getStudentByStudentId(req: any, res: any, next: any) {
    try {
      const student_id = req.params.student_id as number;
      const response = await NotifyService.getNotifyById(student_id);
      res.json(response);
    } catch (error) {
      return next(error);
    }
  }