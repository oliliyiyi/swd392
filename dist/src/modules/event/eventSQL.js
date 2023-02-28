"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEventsInCampus = exports.admInsertEvent = void 0;
function admInsertEvent(name, email, location, point, img, start_date, end_date) {
    const query = `INSERT INTO event (name, email, location, point, img, start_date, end_date) VALUES(?,?,?,?,?,?,?)`;
    const values = [name, email, location, point, img, start_date, end_date];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
}
exports.admInsertEvent = admInsertEvent;
function getAllEventsInCampus(campus_id) {
    const query = `SELECT tb.event_id, tb.name as event_name, tb.email, tb.location, tb.img, 
    tb.start_date, tb.end_date, tl.club_id, tk.name as club_name FROM event tb
    INNER JOIN event_organizer tl
    ON tb.event_id = tl.event_id
    LEFT JOIN (SELECT * FROM clubs WHERE campus_id = ?) tk
    ON tk.club_id = tl.club_id;`;
    const values = [campus_id];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
}
exports.getAllEventsInCampus = getAllEventsInCampus;
