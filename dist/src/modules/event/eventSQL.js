"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.admInsertEvent = void 0;
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
