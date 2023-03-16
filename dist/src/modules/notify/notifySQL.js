"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotifyById = exports.InsertNotifyById = void 0;
function InsertNotifyById(deviceToken, title, content, student_id) {
    const query = `INSERT INTO notify  (deviceToken, title, content,student_id) VALUES(?,?,?,?);`;
    const values = [deviceToken, title, content, student_id];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
}
exports.InsertNotifyById = InsertNotifyById;
function getNotifyById(student_id) {
    const query = `SELECT nt.title, nt.content
    FROM student st
    inner JOIN notify nt
    ON st.student_id = nt.student_id
    WHERE st.student_id = ?`;
    const values = [student_id];
    const queryObject = {
        text: query,
        values,
    };
    return queryObject;
}
exports.getNotifyById = getNotifyById;
