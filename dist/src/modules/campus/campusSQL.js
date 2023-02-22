"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCampus = void 0;
function getAllCampus() {
    const query = `SELECT campus_id, name, address, created_at, updated_at FROM campus`;
    const values = [];
    const queryObject = {
        text: query,
        values,
    };
    return queryObject;
}
exports.getAllCampus = getAllCampus;
