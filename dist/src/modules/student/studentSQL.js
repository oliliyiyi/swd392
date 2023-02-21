"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentInfoByEmail = void 0;
function getStudentInfoByEmail(email) {
    const query = `SELECT student_id, dpm_id, campus_id, name, address, phone, token FROM student WHERE email = ?`;
    const values = [email];
    const queryObject = {
        text: query,
        values,
    };
    return queryObject;
}
exports.getStudentInfoByEmail = getStudentInfoByEmail;
