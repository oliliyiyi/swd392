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
exports.getTopStudentsPointInCampus = exports.getStudentPoint = exports.updateStudentInfo = exports.getAllStudentInfo = exports.getStudentInfoByEmail = exports.getStudentByStudentId = exports.createStudent = exports.updateStudentToken = void 0;
const moment_1 = __importDefault(require("moment"));
const StudentDAL = __importStar(require("../../modules/student/StudentDAL"));
const commonFunction = __importStar(require("../../modules/commonFunction"));
function updateStudentToken(studentId, refresh_token, device_token) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield StudentDAL.updateStudentToken(studentId, refresh_token, device_token);
        return result;
    });
}
exports.updateStudentToken = updateStudentToken;
function createStudent(dpmId, campusId, name, address, phone, email, role, active) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield StudentDAL.createStudent(dpmId, campusId, name, address, phone, email, role, active);
        return result;
    });
}
exports.createStudent = createStudent;
function getStudentByStudentId(studentId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield StudentDAL.getStudentByStudentId(studentId);
        const now = new Date();
        const date = yield commonFunction.getStartAndEndDates(now);
        let pointStudent = yield StudentDAL.getStudentPoint(studentId, date.start_date, date.end_date);
        if (pointStudent) {
            result['point'] = pointStudent.point;
        }
        else {
            result['point'] = 0;
        }
        result.birthday = (0, moment_1.default)(result.birthday).format('YYYY-MM-DD');
        return result;
    });
}
exports.getStudentByStudentId = getStudentByStudentId;
function getStudentInfoByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield StudentDAL.getStudentInfoByEmail(email);
        return result;
    });
}
exports.getStudentInfoByEmail = getStudentInfoByEmail;
function getAllStudentInfo() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield StudentDAL.getAllStudentInfo();
        return result;
    });
}
exports.getAllStudentInfo = getAllStudentInfo;
function updateStudentInfo(student_id, img, phone, address, birthday) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield StudentDAL.updateStudentInfo(student_id, img, phone, address, birthday);
        return result;
    });
}
exports.updateStudentInfo = updateStudentInfo;
function getStudentPoint(student_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const now = new Date();
        const date = yield commonFunction.getStartAndEndDates(now);
        let result = yield StudentDAL.getStudentPoint(student_id, date.start_date, date.end_date);
        if (result) {
            result['semester'] = date.semester;
            return result;
        }
        else {
            return { student_id, 'point': 0, 'semester': date.semester };
        }
    });
}
exports.getStudentPoint = getStudentPoint;
function getTopStudentsPointInCampus(campus_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const now = new Date();
        const date = yield commonFunction.getStartAndEndDates(now);
        const result = yield StudentDAL.getTopStudentsPointInCampus(campus_id, date.start_date, date.end_date);
        return { result, 'semester': date.semester };
    });
}
exports.getTopStudentsPointInCampus = getTopStudentsPointInCampus;
