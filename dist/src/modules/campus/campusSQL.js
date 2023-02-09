"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllListCampus = void 0;
function getAllListCampus() {
    const query = `SELECT campus_id,
                    name,
                    address,
                    description,
                    created_at,
                    updated_at
                    FROM public.campus`;
    const values = [];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
}
exports.getAllListCampus = getAllListCampus;
