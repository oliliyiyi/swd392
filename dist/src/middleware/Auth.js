"use strict";
// const jwt = require("jsonwebtoken");
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
// export function verifyToken(req: any, res: any, next: any) {
//   const authHeader = req.header("Authorization");
//   const token = authHeader && authHeader.split(" ")[1];
//   if (!token) return res.sendStatus(401);
//   try {
//     const decoded = jwt.verifyToken(token, "mysecret");
//     req.userId = decoded.id
//     next();
//   } catch (error) {
//     console.log(error);
//     return res.sendStatus(403);
//   }
// };
const Student = __importStar(require("../service/student/StudentService"));
function isAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var jwt = require("jsonwebtoken");
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer ")))
            return res
                .status(401)
                .json({ message: "Access Denied. No token provided!" });
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
            if (err)
                return res.status(401).json({ message: err.message }); //invalid token
            const studentInfo = yield Student.getStudentByStudentId(decoded.studentInfo.studentInfoID);
            console.log(studentInfo);
            if (studentInfo[0].token === "") {
                return res.status(401).json({ message: "Access token expires !" });
            }
            else {
                req.studentId = decoded.studentInfo.studentInfoID;
                req.studentId = decoded.studentInfo.role;
                next();
            }
        }));
    });
}
exports.isAuth = isAuth;
