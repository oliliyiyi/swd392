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
exports.getAllClubMembers = exports.insertClubMember = exports.getClubMemberInfo = exports.getAllClubsInCampus = void 0;
const ClubSQL = __importStar(require("../../modules/club/clubSQL"));
const db_config_1 = require("../../configs/db_config");
function getAllClubsInCampus(campus_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryString = ClubSQL.getAllClubsInCampus(campus_id);
        const rows = yield (0, db_config_1.query)(queryString.text, queryString.values);
        return rows;
    });
}
exports.getAllClubsInCampus = getAllClubsInCampus;
function getClubMemberInfo(club_id, student_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryString = ClubSQL.getClubMemberInfo(club_id, student_id);
        const rows = yield (0, db_config_1.query)(queryString.text, queryString.values);
        return rows;
    });
}
exports.getClubMemberInfo = getClubMemberInfo;
function insertClubMember(student_id, club_id, role, join_date) {
    return __awaiter(this, void 0, void 0, function* () {
        if (join_date === '') {
            const now = new Date();
            join_date = now.toISOString().slice(0, 10);
        }
        const queryString = ClubSQL.insertClubMember(student_id, club_id, role, join_date);
        const rows = yield (0, db_config_1.query)(queryString.text, queryString.values);
        return rows;
    });
}
exports.insertClubMember = insertClubMember;
function getAllClubMembers(club_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return;
    });
}
exports.getAllClubMembers = getAllClubMembers;
