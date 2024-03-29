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
exports.getTopClubsWithTheMostEvents = exports.deleteClubMember = exports.getClubInfoByClubId = exports.getAllClubsStudentJoin = exports.getAllClubMembers = exports.insertClubMember = exports.getAllClubsInCampus = void 0;
const ClubDAL = __importStar(require("../../modules/club/ClubDAL"));
const commonFunction = __importStar(require("../../modules/commonFunction"));
function getAllClubsInCampus(campus_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield ClubDAL.getAllClubsInCampus(campus_id);
        return result;
    });
}
exports.getAllClubsInCampus = getAllClubsInCampus;
function insertClubMember(student_id, club_id, role, join_date) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield ClubDAL.insertClubMember(student_id, club_id, role, join_date);
        return result;
    });
}
exports.insertClubMember = insertClubMember;
function getAllClubMembers(club_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield ClubDAL.getAllClubMembers(club_id);
        return result;
    });
}
exports.getAllClubMembers = getAllClubMembers;
function getAllClubsStudentJoin(student_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield ClubDAL.getAllClubsStudentJoin(student_id);
        return result;
    });
}
exports.getAllClubsStudentJoin = getAllClubsStudentJoin;
function getClubInfoByClubId(club_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield ClubDAL.getClubInfoByClubId(club_id);
        return result[0];
    });
}
exports.getClubInfoByClubId = getClubInfoByClubId;
function deleteClubMember(student_id, club_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const clubMems = yield getAllClubMembers(club_id);
        let checkMem = false;
        clubMems.forEach((mem) => {
            if (mem.student_id === student_id) {
                checkMem = true;
            }
        });
        if (!checkMem) {
            throw new Error("NotBeClubeMember");
        }
        const result = yield ClubDAL.deleteClubMember(student_id, club_id);
        return result;
    });
}
exports.deleteClubMember = deleteClubMember;
function getTopClubsWithTheMostEvents(campus_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const now = new Date();
        const date = yield commonFunction.getStartAndEndDates(now);
        const result = yield ClubDAL.getTopClubsWithTheMostEvents(campus_id, date.start_date, date.end_date);
        return result;
    });
}
exports.getTopClubsWithTheMostEvents = getTopClubsWithTheMostEvents;
