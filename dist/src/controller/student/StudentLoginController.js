"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLogin = void 0;
const fbInit = __importStar(require("../../../src/configs/fbconfigs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Student = __importStar(require("../../service/student/StudentService"));
const StudentDAL = __importStar(require("../../../src/modules/student/StudentDAL"));
// const users = [
//   {
//     id: 1,
//     username: "Henry",
//   },
//   {
//     id: 2,
//     username: "Jim",
//   },
// ];
// export async function loginAcountStudent(req: any, res: any, next: any) {
//   try {
//     const account = req.body.account;
//     const password = req.body.password;
//     const accountStudent = StudentService.getInfoStudentLogin;
//     if (!accountStudent) return res.sendStatus(401);
//     //create JWT
//     const accessToken = jwt.sign(accountStudent, "mysecret", {
//         expiresIn: '20m'
//     });
//     res.json({ accessToken });
//   } catch (error) {
//     return next(error);
//   }
// }
function handleLogin(req, res, next) {
    const firebaseToken = req.body.token;
    console.log(req.body.token);
    if (!firebaseToken) {
        return res.status(404).json({ message: "Token not found!" });
    }
    const roleGet = req.body.role;
    if (!roleGet) {
        return res.status(404).json({ message: "Role not found!" });
    }
    fbInit.firebaseConnect
        .auth()
        .verifyIdToken(firebaseToken)
        .then((decodedToken) => __awaiter(this, void 0, void 0, function* () {
        console.log(decodedToken);
        let email = decodedToken.email;
        let arr = email.split("@");
        let domain = arr.pop();
        if (domain !== "fpt.edu.vn")
            return res
                .status(403)
                .json({ message: "Email is not acceptable in system!" });
        else {
            const studentInfo = yield Student.getInfoStudentLogin(decodedToken.email);
            if (studentInfo.length > 0 && roleGet == "admin") {
                console.log(studentInfo);
                const access_token = jsonwebtoken_1.default.sign({
                    studentInfo: {
                        studentInfoID: studentInfo[0].student_id,
                        name: studentInfo[0].name,
                        role: studentInfo[0].role,
                    },
                }, "accesstokensecret", {
                    expiresIn: "15m",
                });
                const refresh_token = jsonwebtoken_1.default.sign({
                    studentInfo: {
                        studentId: studentInfo[0].student_id,
                        name: studentInfo[0].name,
                        role: studentInfo[0].role,
                    },
                }, "refreshtokensecret", {
                    expiresIn: "1d",
                });
                yield Student.updateStudentToken(studentInfo[0].student_id, refresh_token);
                var student_data = {
                    id: studentInfo[0].student_id,
                    role: studentInfo[0].role,
                    name: studentInfo[0].name,
                    email: studentInfo[0].email,
                    phone: studentInfo[0].phone,
                };
                res.status(200).json({
                    access_token: access_token,
                    refresh_token: refresh_token,
                    data: student_data,
                    message: "Login successful",
                });
            }
            else if (studentInfo.length > 0 && roleGet == "members") {
                console.log(studentInfo);
                const access_token = jsonwebtoken_1.default.sign({
                    studentInfo: {
                        studentInfoID: studentInfo[0].student_id,
                        name: studentInfo[0].name,
                        role: studentInfo[0].role,
                    },
                }, "accesstokensecret", {
                    expiresIn: "15m",
                });
                const refresh_token = jsonwebtoken_1.default.sign({
                    studentInfo: {
                        studentId: studentInfo[0].student_id,
                        name: studentInfo[0].name,
                        role: studentInfo[0].role,
                    },
                }, "refreshtokensecret", {
                    expiresIn: "1d",
                });
                yield Student.updateStudentToken(studentInfo[0].student_id, refresh_token);
                var student_data = {
                    id: studentInfo[0].student_id,
                    role: studentInfo[0].role,
                    name: studentInfo[0].name,
                    email: studentInfo[0].email,
                    phone: studentInfo[0].phone,
                };
                res.status(200).json({
                    access_token: access_token,
                    refresh_token: refresh_token,
                    data: student_data,
                    message: "Login successful",
                });
            }
            else {
                const dpmId = 1;
                const campusId = 2;
                const active = 1;
                const address = "abc";
                const phone = "123456789";
                yield Student.createStudent(dpmId, campusId, decodedToken.name, address, phone, decodedToken.email, roleGet, active);
                const studentCreated = yield StudentDAL.getStudentInfoByEmail(decodedToken.email);
                const access_token = jsonwebtoken_1.default.sign({
                    studentInfo: {
                        student_id: studentCreated[0].student_id,
                        name: studentCreated[0].name,
                        role: studentCreated[0].role
                    },
                }, "accesstokensecret", {
                    expiresIn: "15m",
                });
                const refresh_token = jsonwebtoken_1.default.sign({
                    studentInfo: {
                        student_id: studentCreated[0].student_id,
                        name: studentCreated[0].name,
                        role: studentCreated[0].role
                    },
                }, "refreshtokensecret", {
                    expiresIn: "1d",
                });
                yield Student.updateStudentToken(studentCreated[0].student_id, refresh_token);
                var student_data = {
                    id: studentCreated[0].student_id,
                    role: studentCreated[0].role,
                    name: studentCreated[0].name,
                    email: studentCreated[0].email,
                    phone: studentCreated[0].phone,
                };
                res.status(200).json({
                    access_token: access_token,
                    refresh_token: refresh_token,
                    data: student_data,
                    message: "Login successful",
                });
            }
        }
    }));
}
exports.handleLogin = handleLogin;
