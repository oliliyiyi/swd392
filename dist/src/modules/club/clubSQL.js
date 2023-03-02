"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertClubMember = exports.getClubMemberInfo = exports.getAllClubsInCampus = void 0;
function getAllClubsInCampus(campus_id) {
    const query = `SELECT club_id, campus_id, name, abbreviation, established_date FROM clubs
    WHERE campus_id = ?;`;
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
