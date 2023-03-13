import * as NotifyDAL from "../../modules/notify/NotiFyDAL";

export async function InsertNotifyById(
    deviceToken: string,
    title: string,
    content: string,
    student_id: number
) {
    const result = NotifyDAL.InsertNotifyById(
        deviceToken,
        title,
        content,
        student_id
    );
    
    console.log(result);
    return result;
}

export async function getNotifyById(student_id: number) {
    const result = NotifyDAL.getNotifyById(student_id);
    return result;
  }