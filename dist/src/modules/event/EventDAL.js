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
exports.deleteEvent = exports.getAllEvents = exports.getEventById = exports.insertPointForStudent = exports.checkoutEvent = exports.payEvent = exports.checkinEvent = exports.getEventsStudentJoin = exports.getStudentsJoinEvent = exports.admApprovedEvent = exports.registerEvent = exports.admInsertEventOrganizer = exports.getEventsByName = exports.getAllEventsInCampus = exports.admInsertEvent = void 0;
const EventSQL = __importStar(require("../../modules/event/eventSQL"));
const db_config_1 = require("../../configs/db_config");
const ClubDAL = __importStar(require("../club/ClubDAL"));
function admInsertEvent(name, email, location, point, price, img, description, start_date, end_date) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryString = EventSQL.admInsertEvent(name, email, location, point, price, img, description, start_date, end_date);
        const rows = yield (0, db_config_1.query)(queryString.text, queryString.values);
        return rows;
    });
}
exports.admInsertEvent = admInsertEvent;
function getAllEventsInCampus(campus_id, status, is_approved) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryString = EventSQL.getAllEventsInCampus(campus_id);
        if (status === 1) {
            queryString.text = queryString.text + ` AND tb.end_date >= current_timestamp()`;
        }
        if (is_approved === 1) {
            queryString.text += ` AND tb.is_approved = 1`;
        }
        else {
            queryString.text += ` AND tb.is_approved = 0`;
        }
        const rows = yield (0, db_config_1.query)(queryString.text, queryString.values);
        rows.sort((a, b) => b.start_date.getTime() - a.start_date.getTime());
        return rows;
    });
}
exports.getAllEventsInCampus = getAllEventsInCampus;
function getEventsByName(name, status) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryString = EventSQL.getEventsByName(name);
        if (status === 1) {
            queryString.text = queryString.text + ` AND end_date >= current_timestamp()`;
        }
        const rows = yield (0, db_config_1.query)(queryString.text, queryString.values);
        rows.sort((a, b) => b.start_date.getTime() - a.start_date.getTime());
        return rows;
    });
}
exports.getEventsByName = getEventsByName;
function admInsertEventOrganizer(event_id, club_id, student_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const clubMem = yield ClubDAL.getClubMemberInfo(club_id, student_id);
        if (clubMem.length > 0) {
            const queryString = EventSQL.admInsertEventOrganizer(event_id, club_id, student_id);
            yield (0, db_config_1.query)(queryString.text, queryString.values);
        }
        else {
            throw new Error("NotClubMember");
        }
        return;
    });
}
exports.admInsertEventOrganizer = admInsertEventOrganizer;
function registerEvent(student_id, event_id, registration_date) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryString = EventSQL.registerEvent(student_id, event_id, registration_date);
        const rows = yield (0, db_config_1.query)(queryString.text, queryString.values);
        return rows;
    });
}
exports.registerEvent = registerEvent;
function admApprovedEvent(event_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryString = EventSQL.admApprovedEvent(event_id);
        const rows = yield (0, db_config_1.query)(queryString.text, queryString.values);
        return rows;
    });
}
exports.admApprovedEvent = admApprovedEvent;
function getStudentsJoinEvent(event_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryString = EventSQL.getStudentsJoinEvent(event_id);
        const studentsJoinEvent = yield (0, db_config_1.query)(queryString.text, queryString.values);
        return studentsJoinEvent;
    });
}
exports.getStudentsJoinEvent = getStudentsJoinEvent;
function getEventsStudentJoin(student_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryString = EventSQL.getEventsStudentJoin(student_id);
        const studentsJoinEvent = yield (0, db_config_1.query)(queryString.text, queryString.values);
        return studentsJoinEvent;
    });
}
exports.getEventsStudentJoin = getEventsStudentJoin;
function checkinEvent(student_id, event_id, checkin) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryString = EventSQL.checkinEvent(student_id, event_id, checkin);
        const rows = yield (0, db_config_1.query)(queryString.text, queryString.values);
        return rows;
    });
}
exports.checkinEvent = checkinEvent;
function payEvent(student_id, event_id, payment) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryString = EventSQL.payEvent(student_id, event_id, payment);
        const rows = yield (0, db_config_1.query)(queryString.text, queryString.values);
        return rows;
    });
}
exports.payEvent = payEvent;
function checkoutEvent(student_id, event_id, checkout) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryString = EventSQL.checkoutEvent(student_id, event_id, checkout);
        const rows = yield (0, db_config_1.query)(queryString.text, queryString.values);
        return rows;
    });
}
exports.checkoutEvent = checkoutEvent;
function insertPointForStudent(student_id, event_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const pointString = EventSQL.getEventPoint(event_id);
        const point = yield (0, db_config_1.query)(pointString.text, pointString.values);
        const queryString = EventSQL.insertPointForStudent(student_id, event_id, point[0].point);
        return yield (0, db_config_1.query)(queryString.text, queryString.values);
    });
}
exports.insertPointForStudent = insertPointForStudent;
function getEventById(event_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryString = EventSQL.getEventById(event_id);
        const eventById = yield (0, db_config_1.query)(queryString.text, queryString.values);
        return eventById;
    });
}
exports.getEventById = getEventById;
function getAllEvents(status, is_approved) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryString = EventSQL.getAllEvents();
        if (status === 1) {
            queryString.text += ` AND tb.end_date >= current_timestamp()`;
        }
        if (is_approved === 1) {
            queryString.text += ` AND tb.is_approved = 1`;
        }
        else {
            queryString.text += ` AND tb.is_approved = 0`;
        }
        const event = yield (0, db_config_1.query)(queryString.text, queryString.values);
        event.sort((a, b) => b.start_date.getTime() - a.start_date.getTime());
        return event;
    });
}
exports.getAllEvents = getAllEvents;
function deleteEvent(event_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryString = EventSQL.deleteEvent(event_id);
        const eventById = yield (0, db_config_1.query)(queryString.text, queryString.values);
        return eventById;
    });
}
exports.deleteEvent = deleteEvent;
