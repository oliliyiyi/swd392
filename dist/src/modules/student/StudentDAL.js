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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentInfo = exports.getAllStudentInfo = exports.getStudentByStudentId = exports.createStudent = exports.updateStudentToken = exports.getStudentInfoByEmail = void 0;
const StudentSQL = __importStar(require("../../modules/student/studentSQL"));
const db_config_1 = require("../../configs/db_config");
function getStudentInfoByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryString = StudentSQL.getStudentInfoByEmail(email);
        const rows = yield (0, db_config_1.query)(queryString.text, queryString.values);
        return rows[0];
    });
}
exports.getStudentInfoByEmail = getStudentInfoByEmail;
function updateStudentToken(studentId, refresh_token, device_token) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryString = StudentSQL.updateStudentToken(studentId, refresh_token, device_token);
        const rows = yield (0, db_config_1.query)(queryString.text, queryString.values);
        return rows;
    });
}
exports.updateStudentToken = updateStudentToken;
function createStudent(dpmId, campusId, name, address, phone, email, role, active) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryString = StudentSQL.createStudent(dpmId, campusId, name, address, phone, email, role, active);
        const rows = yield (0, db_config_1.query)(queryString.text, queryString.values);
        return rows;
    });
}
exports.createStudent = createStudent;
function getStudentByStudentId(studentId) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryString = StudentSQL.getStudentByStudentId(studentId);
        const rows = yield (0, db_config_1.query)(queryString.text, queryString.values);
        return rows[0];
    });
}
exports.getStudentByStudentId = getStudentByStudentId;
function getAllStudentInfo() {
    return __awaiter(this, void 0, void 0, function* () {
        const queryString = StudentSQL.getAllStudentInfo();
        const rows = yield (0, db_config_1.query)(queryString.text, [queryString.values]);
        return rows;
    });
}
exports.getAllStudentInfo = getAllStudentInfo;
function updateStudentInfo(student_id, img, phone, address, birthday) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryString = StudentSQL.updateStudentInfo(student_id, img, phone, address, birthday);
        const rows = yield (0, db_config_1.query)(queryString.text, queryString.values);
        return rows;
    });
}
exports.updateStudentInfo = updateStudentInfo;
