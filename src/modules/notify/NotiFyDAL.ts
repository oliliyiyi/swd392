import { query } from "../../configs/db_config";
import * as NotifySQL from "../../modules/notify/notifySQL";

export async function InsertNotifyById(
    deviceToken: string,
    title: string,
    content: string,
    student_id: number
) {
    const queryString = NotifySQL.InsertNotifyById(
        deviceToken,
        title,
        content,
        student_id
    );
    const rows = await query(queryString.text, queryString.values);
    console.log(rows);
    return;
}

export async function getNotifyById(student_id: number) {
    const queryString = NotifySQL.getNotifyById(student_id);
    const rows = await query(queryString.text, queryString.values);
    return rows;
  }
