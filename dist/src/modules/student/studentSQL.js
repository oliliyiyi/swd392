"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentByStudentId = exports.createStudent = exports.updateStudentToken = exports.getStudentInfoByEmail = void 0;
function getStudentInfoByEmail(email) {
    const query = `SELECT * FROM student WHERE email = ?`;
    const values = [email];
    const queryObject = {
        text: query,
        values,
    };
    return queryObject;
}
exports.getStudentInfoByEmail = getStudentInfoByEmail;
function updateStudentToken(studentId, refresh_token) {
    const query = `UPDATE student SET token = ? WHERE student_id = ?`;
    const values = [refresh_token, studentId];
    const queryObject = {
        text: query,
        values,
    };
    return queryObject;
}
exports.updateStudentToken = updateStudentToken;
function createStudent(dpmId, campusId, name, address, phone, email, role, active) {
    const query = `INSERT INTO student (dpm_id, campus_id, name, address, phone, email, role, active)
    VALUES (?,?,?,?,?,?,?,?)`;
    const values = [
        dpmId,
        campusId,
        name,
        address,
        phone,
        email,
        role,
        active,
    ];
    const queryObject = {
        text: query,
        values,
    };
    return queryObject;
}
exports.createStudent = createStudent;
function getStudentByStudentId(studentId) {
    const query = `SELECT * FROM student WHERE student_id = ?`;
    const values = [studentId];
    const queryObject = {
        text: query,
        values,
    };
    return queryObject;
}
exports.getStudentByStudentId = getStudentByStudentId;
