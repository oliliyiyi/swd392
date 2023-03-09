"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentsJoinEvent = exports.registerEvent = exports.admInsertEventOrganizer = exports.getEventsByName = exports.getAllEventsInCampus = exports.admInsertEvent = void 0;
function admInsertEvent(name, email, location, point, img, description, start_date, end_date) {
    const query = `INSERT INTO event (name, email, location, point, img, description, start_date, end_date) VALUES(?,?,?,?,?,?,?,?);`;
    const values = [name, email, location, point, img, description, start_date, end_date];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
}
exports.admInsertEvent = admInsertEvent;
function getAllEventsInCampus(campus_id) {
    const query = `SELECT  tb.event_id, tb.name as event_name, tb.email, tb.location, tb.img, tb.description, 
    tb.start_date, tb.end_date, tk.club_id, tk.name as club_name FROM (SELECT * FROM clubs WHERE campus_id = ?) tk
	LEFT JOIN event_organizer tl
    ON tk.club_id = tl.club_id
    INNER JOIN event tb
    ON tb.event_id = tl.event_id
    LEFT JOIN student td
    ON td.student_id = tl.student_id`;
    const values = [campus_id];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
}
exports.getAllEventsInCampus = getAllEventsInCampus;
function getEventsByName(name) {
    const query = `SELECT event_id, name, email, location, point, img, description, start_date, end_date
    FROM event WHERE name LIKE CONCAT('%', ?, '%') AND active = 1;`;
    const values = [name];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
}
exports.getEventsByName = getEventsByName;
function admInsertEventOrganizer(event_id, club_id, student_id) {
    const query = `INSERT INTO event_organizer (event_id, club_id, student_id) VALUES (?,?,?);`;
    const values = [event_id, club_id, student_id];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
}
exports.admInsertEventOrganizer = admInsertEventOrganizer;
function registerEvent(student_id, event_id, registration_date) {
    const query = `INSERT INTO join_events (student_id, event_id, registration_date) VALUES (?,?,?);`;
    const values = [student_id, event_id, registration_date];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
}
exports.registerEvent = registerEvent;
function getStudentsJoinEvent(event_id) {
    const query = `SELECT tl.student_id, td.dpm_id, td.campus_id, td.name, td.email 
    FROM (SELECT * FROM join_events WHERE event_id = ?) tl
    LEFT JOIN student td
    ON tl.student_id = td.student_id`;
    const values = [event_id];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
}
exports.getStudentsJoinEvent = getStudentsJoinEvent;
