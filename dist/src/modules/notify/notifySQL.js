"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotifyById = exports.InsertNotifyById = void 0;
function InsertNotifyById(deviceToken, title, content, student_id) {
    const query = `INSERT INTO deviceToken  (deviceToken, title, content,student_id) VALUES(?,?,?,?,?);`;
    const values = [deviceToken, title, content, student_id];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
}
exports.InsertNotifyById = InsertNotifyById;
function getNotifyById(student_id) {
    const query = `SELECT st.student_id, st.name as student_name, st.address, st.phone, st.role, st.email, st.birthday, cp.campus_id, cp.name as campus_name
    FROM student st
    inner JOIN notify nt
    ON st.student_id = nt.student_id
    WHERE st.deviceToken = nt.deviceToken AND st.student_id = ?`;
    const values = [student_id];
    const queryObject = {
        text: query,
        values,
    };
    return queryObject;
}
exports.getNotifyById = getNotifyById;
