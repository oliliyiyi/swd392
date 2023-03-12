"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentInfo = exports.getStudentByStudentId = exports.createStudent = exports.updateStudentToken = exports.getAllStudentInfo = exports.getStudentInfoByEmail = void 0;
function getStudentInfoByEmail(email) {
    const query = `SELECT st.student_id, st.name as student_name, st.address, st.phone, st.role, st.email, st.birthday, cp.campus_id, cp.name as campus_name
  FROM student st
  inner JOIN campus cp
  ON st.campus_id = cp.campus_id
  WHERE st.email = ?`;
    const values = [email];
    const queryObject = {
        text: query,
        values,
    };
    return queryObject;
}
exports.getStudentInfoByEmail = getStudentInfoByEmail;
function getAllStudentInfo() {
    const query = `SELECT st.student_id, st.name, st.address, st.phone, st.role, st.email, st.birthday
  FROM student st
  Where st.active = 1`;
    const values = [];
    const queryObject = {
        text: query,
        values,
    };
    return queryObject;
}
exports.getAllStudentInfo = getAllStudentInfo;
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
function updateStudentInfo(student_id, phone, address, birthday) {
    const query = `UPDATE student SET phone = ? , address = ? , birthday = ? WHERE student_id = ? ;`;
    const values = [phone, address, birthday, student_id];
    const queryObject = {
        text: query,
        values,
    };
    return queryObject;
}
exports.updateStudentInfo = updateStudentInfo;
