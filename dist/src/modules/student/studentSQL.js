"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAcountStudentLogin = void 0;
function getAcountStudentLogin(account, password) {
    const query = `SELECT account,
                    student_id
                    FROM student_account
                    WHERE account = $1 AND password = $2`;
    const values = [account, password];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
}
exports.getAcountStudentLogin = getAcountStudentLogin;
