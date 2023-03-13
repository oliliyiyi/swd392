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
function handleLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const firebaseToken = req.body.token;
        console.log(req.body.token);
        const device_token = req.body.deviceToken;
        let tokenDevice;
        console.log(req.body.deviceToken);
        // const Redisclient = redis.client;
        // let cachedProducts = await Redisclient.get("myTokenDevice");
        // if(device_token !== "string" || !device_token){
        //   Redisclient.set("myTokenDevice",JSON.stringify(device_token));
        //   cachedProducts = await Redisclient.get("myTokenDevice");
        //   tokenDevice = JSON.parse(cachedProducts);
        // }else if(cachedProducts){
        //   //  cachedProducts = await Redisclient.get("myTokenDevice");
        //    tokenDevice = JSON.parse(cachedProducts);
        // }
        if (!firebaseToken) {
            return res.status(404).json({ message: "Token not found!" });
        }
        const roleGet = req.body.role;
        if (!roleGet) {
            return res.status(404).json({ message: "Role not found!" });
        }
        const decodedToken = jsonwebtoken_1.default.decode(firebaseToken);
        if (decodedToken === null) {
            return res.status(401).json({ message: "Access token invalid!" });
        }
        const now = Date.now() / 1000;
        if (decodedToken.exp && decodedToken.exp < now) {
            console.log("Access token has expired");
            return res.status(401).json({ message: "Access token has expired" });
        }
        else {
            console.log("Access token is still valid");
        }
        // fbInit.firebaseConnect
        //   .auth()
        //   .verifyIdToken(firebaseToken)
        //   .then(async (decodedToken: any) => {
        console.log(decodedToken);
        let email = decodedToken.email;
        let arr = email.split("@");
        let domain = arr.pop();
        if (domain !== "fpt.edu.vn")
            return res
                .status(403)
                .json({ message: "Email is not acceptable in system!" });
        else {
            const studentInfo = yield Student.getStudentInfoByEmail(decodedToken.email);
            if (studentInfo && roleGet == "admin") {
                console.log(studentInfo);
                const access_token = jsonwebtoken_1.default.sign({
                    studentInfo: {
                        studentInfoID: studentInfo.student_id,
                        name: studentInfo.student_name,
                        role: studentInfo.role,
                        campus: studentInfo.campus_id,
                    },
                }, "accesstokensecret", {
                    expiresIn: "15m",
                });
                const refresh_token = jsonwebtoken_1.default.sign({
                    studentInfo: {
                        studentId: studentInfo.student_id,
                        name: studentInfo.student_name,
                        role: studentInfo.role,
                        campus: studentInfo.campus_id
                    },
                }, "refreshtokensecret", {
                    expiresIn: "1d",
                });
                if (device_token !== "string" || !device_token) {
                    console.log("ko co device token");
                    tokenDevice = null;
                }
                else {
                    tokenDevice = device_token;
                }
                yield Student.updateStudentToken(studentInfo.student_id, refresh_token, tokenDevice);
                var student_data = {
                    id: studentInfo.student_id,
                    role: studentInfo.role,
                    name: studentInfo.student_name,
                    email: studentInfo.email,
                    phone: studentInfo.phone,
                    campus: studentInfo.campus_id
                };
                // if(device_token){
                // res.cookie("device_token", device_token, {
                //   httpOnly: true,
                //   secure: true,
                //   maxAge: 24 * 60 * 60 * 1000,
                // });}
                res.status(200).json({
                    access_token: access_token,
                    refresh_token: refresh_token,
                    data: student_data,
                    device_tokens: tokenDevice,
                    message: "Login successful",
                });
            }
            else if (studentInfo && roleGet == "members") {
                console.log(studentInfo);
                const access_token = jsonwebtoken_1.default.sign({
                    studentInfo: {
                        studentInfoID: studentInfo.student_id,
                        name: studentInfo.name,
                        role: studentInfo.role,
                        campus: studentInfo.campus_id
                    },
                }, "accesstokensecret", {
                    expiresIn: "15m",
                });
                const refresh_token = jsonwebtoken_1.default.sign({
                    studentInfo: {
                        studentId: studentInfo.student_id,
                        name: studentInfo.student_name,
                        role: studentInfo.role,
                        campus: studentInfo.campus_id
                    },
                }, "refreshtokensecret", {
                    expiresIn: "1d",
                });
                if (device_token !== "string" || !device_token) {
                    console.log("ko co device token");
                    tokenDevice = null;
                }
                else {
                    tokenDevice = device_token;
                }
                yield Student.updateStudentToken(studentInfo.student_id, refresh_token, tokenDevice);
                var student_data = {
                    id: studentInfo.student_id,
                    role: studentInfo.role,
                    name: studentInfo.name,
                    email: studentInfo.email,
                    phone: studentInfo.phone,
                    campus: studentInfo.campus_id
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
                const campusId = 1;
                const active = 1;
                const address = "abc";
                const phone = "123456789";
                yield Student.createStudent(dpmId, campusId, decodedToken.name, address, phone, decodedToken.email, roleGet, active);
                const studentCreated = yield StudentDAL.getStudentInfoByEmail(decodedToken.email);
                const access_token = jsonwebtoken_1.default.sign({
                    studentInfo: {
                        student_id: studentCreated.student_id,
                        name: studentCreated.student_name,
                        role: studentCreated.role,
                        campus: studentCreated.campus_id
                    },
                }, "accesstokensecret", {
                    expiresIn: "15m",
                });
                const refresh_token = jsonwebtoken_1.default.sign({
                    studentInfo: {
                        student_id: studentCreated.student_id,
                        name: studentCreated.student_name,
                        role: studentCreated.role,
                        campus: studentCreated.campus_id
                    },
                }, "refreshtokensecret", {
                    expiresIn: "1d",
                });
                if (device_token !== "string" || !device_token) {
                    console.log("ko co device token");
                    tokenDevice = null;
                }
                else {
                    tokenDevice = device_token;
                }
                yield Student.updateStudentToken(studentCreated.student_id, refresh_token, tokenDevice);
                var student_data = {
                    id: studentCreated.student_id,
                    role: studentCreated.role,
                    name: studentCreated.student_name,
                    email: studentCreated.email,
                    phone: studentCreated.phone,
                    campus: studentCreated.campus_id
                };
                res.status(200).json({
                    access_token: access_token,
                    refresh_token: refresh_token,
                    data: student_data,
                    message: "Login successful",
                });
            }
        }
        // });
    });
}
exports.handleLogin = handleLogin;
