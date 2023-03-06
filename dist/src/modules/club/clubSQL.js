"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertClubMember = exports.getClubMemberInfo = exports.getAllClubsInCampus = void 0;
function getAllClubsInCampus(campus_id) {
    const query = `SELECT tl.club_id, tl.campus_id, tl.name, tl.abbreviation, tl.established_date, COUNT(tb.student_id) as totalMembers FROM 
    (SELECT * FROM clubs WHERE campus_id = ?) tl
    LEFT JOIN club_member tb
    ON tl.club_id = tb.club_id
    GROUP BY tl.club_id, tl.campus_id, tl.name, tl.abbreviation, tl.established_date;`;
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
