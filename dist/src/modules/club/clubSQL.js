"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClubInfoByClubId = exports.getAllClubsStudentJoin = exports.getAllClubMembers = exports.insertClubMember = exports.getClubMemberInfo = exports.getAllClubsInCampus = void 0;
function getAllClubsInCampus(campus_id) {
    const query = `SELECT tl.club_id, tl.campus_id, tl.name, tl.abbreviation, tl.established_date, tl.img, COUNT(tb.student_id) as totalMembers FROM 
    (SELECT * FROM clubs WHERE campus_id = ?) tl
    LEFT JOIN club_member tb
    ON tl.club_id = tb.club_id
    GROUP BY tl.club_id, tl.campus_id, tl.name, tl.abbreviation, tl.established_date, tl.img;`;
    const values = [campus_id];
    const queryObject = {
        text: query,
        values,
    };
    return queryObject;
}
exports.getAllClubsInCampus = getAllClubsInCampus;
function getClubMemberInfo(club_id, student_id) {
    const query = `SELECT student_id, club_id, role, join_date 
  FROM club_member WHERE student_id = ? AND club_id = ?;`;
    const values = [club_id, student_id];
    const queryObject = {
        text: query,
        values,
    };
    return queryObject;
}
exports.getClubMemberInfo = getClubMemberInfo;
function insertClubMember(student_id, club_id, role, join_date) {
    const query = `INSERT INTO club_member (student_id, club_id, role, join_date) VALUES (?,?,?,?);`;
    const values = [student_id, club_id, role, join_date];
    const queryObject = {
        text: query,
        values,
    };
    return queryObject;
}
exports.insertClubMember = insertClubMember;
function getAllClubMembers(club_id) {
    const query = `SELECT td.student_id, td.name as student_name, tf.name as campus_name, tk.name as dpm_name,
  td.address, td.phone, td.email, td.role, tb.join_date 
  FROM (SELECT * FROM club_member WHERE club_id = ?) tb
  LEFT JOIN clubs tl
  ON tb.club_id = tl.club_id
  LEFT JOIN student td
  ON tb.student_id = td.student_id
  LEFT JOIN department tk
  ON tk.dpm_id = td.dpm_id
  LEFT JOIN campus tf
  ON tf.campus_id = td.campus_id`;
    const values = [club_id];
    const queryObject = {
        text: query,
        values,
    };
    return queryObject;
}
exports.getAllClubMembers = getAllClubMembers;
function getAllClubsStudentJoin(student_id) {
    const query = `SELECT  tl.club_id, tl.name as club_name, tl.abbreviation, tl.established_date, tl.img 
  FROM (SELECT * FROM club_member WHERE student_id = ?) tb
  LEFT JOIN clubs tl
  ON tb.club_id = tl.club_id`;
    const values = [student_id];
    const queryObject = {
        text: query,
        values,
    };
    return queryObject;
}
exports.getAllClubsStudentJoin = getAllClubsStudentJoin;
function getClubInfoByClubId(club_id) {
    const query = `SELECT club_id, name as club_name, abbreviation, established_date, img 
  FROM clubs WHERE club_id = ?`;
    const values = [club_id];
    const queryObject = {
        text: query,
        values,
    };
    return queryObject;
}
exports.getClubInfoByClubId = getClubInfoByClubId;
