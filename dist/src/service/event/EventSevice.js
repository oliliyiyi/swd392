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
exports.deleteEvent = exports.getEventById = exports.getAllEvents = exports.getEventsStudentJoin = exports.getStudentsJoinEvent = exports.checkoutEvent = exports.checkinEvent = exports.payEvent = exports.registerEvent = exports.getEventsByName = exports.admApprovedEvent = exports.getAllEventsInCampus = exports.admInsertEvent = void 0;
const moment_1 = __importDefault(require("moment"));
const EventDAL = __importStar(require("../../modules/event/EventDAL"));
function admInsertEvent(name, email, club_id, student_id, location, point, price, img, description, start_date, end_date) {
    return __awaiter(this, void 0, void 0, function* () {
        const event = yield EventDAL.admInsertEvent(name, email, location, point, price, img, description, start_date, end_date);
        yield EventDAL.admInsertEventOrganizer(event === null || event === void 0 ? void 0 : event.insertId, club_id, student_id);
        return;
    });
}
exports.admInsertEvent = admInsertEvent;
function getAllEventsInCampus(campus_id, status, is_approved) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield EventDAL.getAllEventsInCampus(campus_id, status, is_approved);
        return result;
    });
}
exports.getAllEventsInCampus = getAllEventsInCampus;
function admApprovedEvent(event_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield EventDAL.admApprovedEvent(event_id);
        return result;
    });
}
exports.admApprovedEvent = admApprovedEvent;
function getEventsByName(name, status) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield EventDAL.getEventsByName(name, status);
        return result;
    });
}
exports.getEventsByName = getEventsByName;
function registerEvent(student_id, event_id, registration_date) {
    return __awaiter(this, void 0, void 0, function* () {
        const studentsJoinEvent = yield EventDAL.getStudentsJoinEvent(event_id);
        studentsJoinEvent.forEach((student) => {
            if (student.student_id === student_id) {
                throw new Error("StudentAlreadyJoinEvent");
            }
        });
        return yield EventDAL.registerEvent(student_id, event_id, registration_date);
    });
}
exports.registerEvent = registerEvent;
function payEvent(student_id, event_id, payment) {
    return __awaiter(this, void 0, void 0, function* () {
        const event = yield EventDAL.getEventById(event_id);
        if (event.length <= 0 && event[0].active !== 1) {
            throw new Error("EventNotExisted");
        }
        return yield EventDAL.payEvent(student_id, event_id, payment);
    });
}
exports.payEvent = payEvent;
function checkinEvent(student_id, event_id, checkin) {
    return __awaiter(this, void 0, void 0, function* () {
        const event = yield EventDAL.getEventById(event_id);
        if (event.length > 0 && event[0].active === 1) {
            const studentsJoinEvent = yield EventDAL.getStudentsJoinEvent(event_id);
            let checkStudentJoinEvent = false;
            studentsJoinEvent.forEach((student) => {
                if (student.student_id === student_id) {
                    checkStudentJoinEvent = true;
                }
            });
            if (!checkStudentJoinEvent) {
                yield registerEvent(student_id, event_id, checkin);
            }
        }
        else {
            throw new Error("EventNotExisted");
        }
        return yield EventDAL.checkinEvent(student_id, event_id, checkin);
    });
}
exports.checkinEvent = checkinEvent;
function checkoutEvent(student_id, event_id, checkout) {
    return __awaiter(this, void 0, void 0, function* () {
        const studentsJoinEvent = yield EventDAL.getStudentsJoinEvent(event_id);
        let checkStudentJoinEvent = false;
        studentsJoinEvent.forEach((student) => {
            if (student.student_id === student_id) {
                checkStudentJoinEvent = true;
                if (!student.checkin) {
                    throw new Error("NotCheckin");
                }
                if (student.checkout) {
                    throw new Error("AlreadyCheckout");
                }
            }
        });
        if (!checkStudentJoinEvent) {
            throw new Error("NotRegisteredToParticipate");
        }
        yield EventDAL.checkoutEvent(student_id, event_id, checkout);
        yield EventDAL.insertPointForStudent(student_id, event_id);
        return;
    });
}
exports.checkoutEvent = checkoutEvent;
function getStudentsJoinEvent(event_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield EventDAL.getStudentsJoinEvent(event_id);
        return result;
    });
}
exports.getStudentsJoinEvent = getStudentsJoinEvent;
function getEventsStudentJoin(student_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield EventDAL.getEventsStudentJoin(student_id);
        result.forEach((event) => {
            event.start_date = event.start_date ? (0, moment_1.default)(event.start_date).format('YYYY-MM-DD HH:mm:ss') : null;
            event.end_date = event.end_date ? (0, moment_1.default)(event.end_date).format('YYYY-MM-DD HH:mm:ss') : null;
            event.registration_date = event.registration_date ? (0, moment_1.default)(event.registration_date).format('YYYY-MM-DD HH:mm:ss') : null;
            event.checkin = event.checkin ? (0, moment_1.default)(event.checkin).format('YYYY-MM-DD HH:mm:ss') : null;
            event.checkout = event.checkout ? (0, moment_1.default)(event.checkout).format('YYYY-MM-DD HH:mm:ss') : null;
        });
        return result;
    });
}
exports.getEventsStudentJoin = getEventsStudentJoin;
function getAllEvents(status, is_approved) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield EventDAL.getAllEvents(status, is_approved);
        return result;
    });
}
exports.getAllEvents = getAllEvents;
function getEventById(event_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield EventDAL.getEventById(event_id);
        return result[0];
    });
}
exports.getEventById = getEventById;
function deleteEvent(event_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const event = yield EventDAL.getEventById(event_id);
        if (event.length > 0 && Number(event[0].active) === 1) {
            yield EventDAL.deleteEvent(event_id);
        }
        else {
            throw new Error("EventIsNotExisted");
        }
        return;
    });
}
exports.deleteEvent = deleteEvent;
