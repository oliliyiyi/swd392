"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.checkoutEvent = exports.checkinEvent = exports.getEventById = exports.getAllEvents = exports.getEventsStudentJoin = exports.getStudentsJoinEvent = exports.admApprovedEvent = exports.registerEvent = exports.admInsertEventOrganizer = exports.getEventsByName = exports.getAllEventsInCampus = exports.admInsertEvent = void 0;
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
    const query = `SELECT tb.event_id, tb.name as event_name, tb.email, tb.location, tb.img, tb.description, 
    tb.start_date, tb.end_date, tk.club_id, tk.name as club_name, td.student_id, td.name as student_name
    FROM clubs tk
	LEFT JOIN event_organizer tl
    ON tk.club_id = tl.club_id
    INNER JOIN event tb
    ON tb.event_id = tl.event_id
    LEFT JOIN student td
    ON td.student_id = tl.student_id
    WHERE tk.campus_id = ? AND tb.active = 1`;
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
    FROM event WHERE name LIKE CONCAT('%', ?, '%') AND active = 1`;
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
function admApprovedEvent(event_id) {
    const query = `UPDATE event SET is_approved = 1 WHERE event_id = ?;`;
    const values = [event_id];
    const queryObject = {
        text: query,
        values,
    };
    return queryObject;
}
exports.admApprovedEvent = admApprovedEvent;
function getStudentsJoinEvent(event_id) {
    const query = `SELECT tl.student_id, td.name as student_name, td.dpm_id, tk.name as dpm_name, 
    td.campus_id, tf.name as campus_name, td.email, tl.registration_date , tl.checkin, tl.checkout
    FROM (SELECT * FROM join_events WHERE event_id = ?) tl
    LEFT JOIN student td
    ON tl.student_id = td.student_id
    LEFT JOIN department tk
    ON td.dpm_id = tk.dpm_id
    LEFT JOIN campus tf
    ON td.campus_id = tf.campus_id`;
    const values = [event_id];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
}
exports.getStudentsJoinEvent = getStudentsJoinEvent;
function getEventsStudentJoin(student_id) {
    const query = `SELECT tb.event_id, tb.name, tb.location, tb.img,
    tb.description, tb.start_date, tb.end_date, tl.registration_date , tl.checkin, tl.checkout
    FROM (SELECT * FROM join_events WHERE student_id = ?) tl
    INNER JOIN (SELECT * FROM event WHERE active = 1) tb
    ON tb.event_id = tl.event_id`;
    const values = [student_id];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
}
exports.getEventsStudentJoin = getEventsStudentJoin;
function getAllEvents() {
    const query = `SELECT tb.event_id, tb.name as event_name, tb.email, tb.location,tb.point ,tb.img, tb.description, 
    tb.start_date, tb.end_date, tk.club_id, tk.name as club_name, td.student_id, td.name as student_name
    FROM (SELECT * FROM event WHERE active = 1) tb
	LEFT JOIN event_organizer tl
    ON tb.event_id = tl.event_id
    LEFT JOIN clubs tk
    ON tk.club_id = tl.club_id
    LEFT JOIN student td
    ON td.student_id = tl.student_id
    WHERE tb.active = 1`;
    const values = [];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
}
exports.getAllEvents = getAllEvents;
function getEventById(event_id) {
    const query = `SELECT tb.event_id, tb.name as event_name, tb.email, tb.location, tb.img, tb.description, 
    tb.start_date, tb.end_date, tb.active, tb.is_approved, tk.club_id, tk.name as club_name, td.student_id, td.name as student_name
    FROM (SELECT * FROM event WHERE event_id = ?) tb
	LEFT JOIN event_organizer tl
    ON tb.event_id = tl.event_id
    LEFT JOIN clubs tk
    ON tk.club_id = tl.club_id
    LEFT JOIN student td
    ON td.student_id = tl.student_id`;
    const values = [event_id];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
}
exports.getEventById = getEventById;
function checkinEvent(student_id, event_id, checkin) {
    const query = `UPDATE join_events SET checkin = ? WHERE student_id = ? AND event_id = ?;`;
    const values = [checkin, student_id, event_id];
    const queryObject = {
        text: query,
        values,
    };
    return queryObject;
}
exports.checkinEvent = checkinEvent;
function checkoutEvent(student_id, event_id, checkout) {
    const query = `UPDATE join_events SET checkout = ? WHERE student_id = ? AND event_id = ?;`;
    const values = [checkout, student_id, event_id];
    const queryObject = {
        text: query,
        values,
    };
    return queryObject;
}
exports.checkoutEvent = checkoutEvent;
function deleteEvent(event_id) {
    const query = `UPDATE event SET active = 0 WHERE event_id = ?;`;
    const values = [event_id];
    const queryObject = {
        text: query,
        values,
    };
    return queryObject;
}
exports.deleteEvent = deleteEvent;
