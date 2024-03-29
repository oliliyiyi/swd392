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
exports.deleteEvent = exports.getAllEvents = exports.getEventsStudentJoin = exports.getStudentsJoinEvent = exports.payEvent = exports.checkoutEvent = exports.checkinEvent = exports.registerEvent = exports.getEventById = exports.getEventsByName = exports.getAllEventsInCampus = exports.admApprovedEvent = exports.admInsertEvent = void 0;
const EventService = __importStar(require("../../service/event/EventSevice"));
const db_config_1 = require("../../configs/db_config");
const fbInit = __importStar(require("../../configs/fbconfigs"));
const fs_1 = __importDefault(require("fs"));
function admInsertEvent(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const name = req.body.name;
            const email = req.body.email;
            const club_id = Number(req.body.club_id);
            const student_id = Number(req.body.student_id);
            const location = req.body.location;
            const point = req.body.point;
            const price = req.body.price;
            const fileGet = req.file;
            let img = "";
            const description = req.body.description;
            const start_date = req.body.start_date;
            const end_date = req.body.end_date;
            yield db_config_1.db.query("START TRANSACTION");
            if (!fileGet)
                return res.status(404).json({ message: "File not found" });
            let pathSave = "./src/image/" + fileGet.originalname;
            console.log(pathSave);
            const bucket = fbInit.firebaseConnect.storage().bucket();
            const file = bucket.file(fileGet.originalname);
            const stream = file.createWriteStream({
                resumable: false,
            });
            console.log("file ok");
            var pathImg = "./src/image/" + fileGet.originalname;
            fs_1.default.createReadStream(pathImg)
                .pipe(stream)
                .on("error", (error) => {
                console.error("Error uploading image:", error);
                return res.status(500).json({ message: "Upload file to firebase error!" });
            })
                .on("finish", () => {
                console.log("Successfully uploaded image.");
            });
            file
                .getSignedUrl({
                action: "read",
                expires: "01-01-2030",
            })
                .then((signedUrls) => __awaiter(this, void 0, void 0, function* () {
                console.log(signedUrls);
                img = signedUrls[0];
                yield EventService.admInsertEvent(name, email, club_id, student_id, location, point, price, img, description, start_date, end_date);
                yield db_config_1.db.query("COMMIT");
                res.json();
                // res.status(200).json({ data: signedUrls[0], message: "Successfully uploaded image" });
            }))
                .catch((error) => {
                console.error("Error getting image URL:", error);
                //res.status(500).json({ message: "Error get link image from firebase!" });
            });
        }
        catch (error) {
            yield db_config_1.db.query("ROLLBACK");
            if (error.message === "NotClubMember") {
                res.status(400).json({ message: "This student is not a club member" });
            }
            else {
                return next(error);
            }
            return next(error);
        }
    });
}
exports.admInsertEvent = admInsertEvent;
function admApprovedEvent(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_config_1.db.query("START TRANSACTION");
            const event_id = req.params.event_id;
            yield EventService.admApprovedEvent(event_id);
            yield db_config_1.db.query("COMMIT");
            res.json();
        }
        catch (error) {
            yield db_config_1.db.query("ROLLBACK");
            return next(error);
        }
    });
}
exports.admApprovedEvent = admApprovedEvent;
function getAllEventsInCampus(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const campus_id = req.params.campus_id;
            const status = Number(req.query.status || 0);
            const is_approved = Number(req.query.is_approved || 0);
            const response = yield EventService.getAllEventsInCampus(campus_id, status, is_approved);
            res.json(response);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getAllEventsInCampus = getAllEventsInCampus;
function getEventsByName(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const name = req.query.name;
            const status = Number(req.query.status || 0);
            const response = yield EventService.getEventsByName(name, status);
            res.json(response);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getEventsByName = getEventsByName;
function getEventById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.params.event_id);
            const id = req.params.event_id;
            const response = yield EventService.getEventById(id);
            res.json(response);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getEventById = getEventById;
function registerEvent(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_config_1.db.query("START TRANSACTION");
            const student_id = req.body.student_id;
            const event_id = req.body.event_id;
            const registration_date = req.body.registration_date;
            yield EventService.registerEvent(student_id, event_id, registration_date);
            yield db_config_1.db.query("COMMIT");
            res.json();
        }
        catch (error) {
            yield db_config_1.db.query("ROLLBACK");
            if (error.message === "StudentAlreadyJoinEvent") {
                res.status(400).json({ message: "This student is already join event" });
            }
            return next(error);
        }
    });
}
exports.registerEvent = registerEvent;
function checkinEvent(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_config_1.db.query("START TRANSACTION");
            const student_id = req.body.student_id;
            const event_id = req.params.event_id;
            const checkin = req.body.checkin;
            yield EventService.checkinEvent(student_id, event_id, checkin);
            yield db_config_1.db.query("COMMIT");
            res.json();
        }
        catch (error) {
            yield db_config_1.db.query("ROLLBACK");
            if (error.message === "EventNotExisted") {
                res.status(400).json({ message: "Event does not existed" });
            }
            return next(error);
        }
    });
}
exports.checkinEvent = checkinEvent;
function checkoutEvent(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_config_1.db.query("START TRANSACTION");
            const student_id = req.body.student_id;
            const event_id = req.params.event_id;
            const checkout = req.body.checkout;
            yield EventService.checkoutEvent(student_id, event_id, checkout);
            yield db_config_1.db.query("COMMIT");
            res.json();
        }
        catch (error) {
            yield db_config_1.db.query("ROLLBACK");
            if (error.message === "NotCheckin") {
                res.status(400).json({ message: "Students have not checked in the event" });
            }
            if (error.message === "NotRegisteredToParticipate") {
                res.status(400).json({ message: "Students have not registerd to participate event" });
            }
            if (error.message === "AlreadyCheckout") {
                res.status(400).json({ message: "Students Already Checkout" });
            }
            return next(error);
        }
    });
}
exports.checkoutEvent = checkoutEvent;
function payEvent(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_config_1.db.query("START TRANSACTION");
            const student_id = req.body.student_id;
            const event_id = req.params.event_id;
            const payment = req.body.payment;
            yield EventService.payEvent(student_id, event_id, payment);
            yield db_config_1.db.query("COMMIT");
            res.json();
        }
        catch (error) {
            yield db_config_1.db.query("ROLLBACK");
            if (error.message === "EventNotExisted") {
                res.status(400).json({ message: "Event does not existed" });
            }
            return next(error);
        }
    });
}
exports.payEvent = payEvent;
function getStudentsJoinEvent(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const event_id = req.params.event_id;
            const response = yield EventService.getStudentsJoinEvent(event_id);
            res.json(response);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getStudentsJoinEvent = getStudentsJoinEvent;
function getEventsStudentJoin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const student_id = req.params.student_id;
            const response = yield EventService.getEventsStudentJoin(student_id);
            res.json(response);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getEventsStudentJoin = getEventsStudentJoin;
function getAllEvents(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const status = Number(req.query.status || 0);
            const is_approved = Number(req.query.is_approved || 0);
            const response = yield EventService.getAllEvents(status, is_approved);
            res.json(response);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getAllEvents = getAllEvents;
function deleteEvent(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_config_1.db.query("START TRANSACTION");
            const event_id = Number(req.params.event_id);
            yield EventService.deleteEvent(event_id);
            yield db_config_1.db.query("COMMIT");
            res.json();
        }
        catch (error) {
            yield db_config_1.db.query("ROLLBACK");
            if (error.message === "EventIsNotExisted") {
                res.status(400).json({ message: "Event is not existed" });
            }
            return next(error);
        }
    });
}
exports.deleteEvent = deleteEvent;
