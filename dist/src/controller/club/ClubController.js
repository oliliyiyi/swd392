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
exports.deleteClubMember = exports.getClubInfoByClubId = exports.getAllClubsStudentJoin = exports.getAllClubMembers = exports.insertClubMember = exports.getAllClubsInCampus = void 0;
const ClubService = __importStar(require("../../service/club/ClubService"));
const db_config_1 = require("../../configs/db_config");
function getAllClubsInCampus(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const campus_id = req.params.campus_id;
            const response = yield ClubService.getAllClubsInCampus(campus_id);
            res.json(response);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getAllClubsInCampus = getAllClubsInCampus;
function insertClubMember(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_config_1.db.query("START TRANSACTION");
            const student_id = req.body.student_id;
            const club_id = req.body.club_id;
            const role = req.body.role;
            const join_date = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.join_date) || '';
            const response = yield ClubService.insertClubMember(student_id, club_id, role, join_date);
            yield db_config_1.db.query("COMMIT");
            res.json(response);
        }
        catch (error) {
            yield db_config_1.db.query("ROLLBACK");
            res.status(400).json({ message: "Action Fail" });
        }
    });
}
exports.insertClubMember = insertClubMember;
function getAllClubMembers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const club_id = req.query.club_id;
            const response = yield ClubService.getAllClubMembers(club_id);
            res.json(response);
        }
        catch (error) {
            res.status(400).json({ message: "Action Fail" });
        }
    });
}
exports.getAllClubMembers = getAllClubMembers;
function getAllClubsStudentJoin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const student_id = req.params.student_id;
            const response = yield ClubService.getAllClubsStudentJoin(student_id);
            res.json(response);
        }
        catch (error) {
            res.status(400).json({ message: "Action Fail" });
        }
    });
}
exports.getAllClubsStudentJoin = getAllClubsStudentJoin;
function getClubInfoByClubId(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const club_id = req.params.club_id;
            const response = yield ClubService.getClubInfoByClubId(club_id);
            res.json(response);
        }
        catch (error) {
            res.status(400).json({ message: "Action Fail" });
        }
    });
}
exports.getClubInfoByClubId = getClubInfoByClubId;
function deleteClubMember(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_config_1.db.query("START TRANSACTION");
            const student_id = Number(req.params.student_id);
            const club_id = req.query.club_id;
            const response = yield ClubService.deleteClubMember(student_id, club_id);
            yield db_config_1.db.query("COMMIT");
            res.json(response);
        }
        catch (error) {
            yield db_config_1.db.query("ROLLBACK");
            if (error.message === "NotBeClubeMember") {
                res.status(400).json({ message: "Students is not a club's member" });
            }
            res.status(400).json({ message: "Action Fail" });
        }
    });
}
exports.deleteClubMember = deleteClubMember;
