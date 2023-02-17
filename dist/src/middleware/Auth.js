"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
        return res.sendStatus(401);
    try {
        const decoded = jwt.verifyToken(token, "mysecret");
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(403);
    }
}
exports.verifyToken = verifyToken;
;
