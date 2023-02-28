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
exports.getAllEventsInCampus = exports.admInsertEvent = void 0;
const EventService = __importStar(require("../../service/event/EventSevice"));
const db_config_1 = require("../../configs/db_config");
function admInsertEvent(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_config_1.db.query("START TRANSACTION");
            const name = req.body.name;
            const email = req.body.email;
            const location = req.body.location;
            const point = req.body.point;
            const img = req.body.img;
            const start_date = req.body.start_date;
            const end_date = req.body.end_date;
            yield EventService.admInsertEvent(name, email, location, point, img, start_date, end_date);
            yield db_config_1.db.query("COMMIT");
            res.json();
        }
        catch (error) {
            yield db_config_1.db.query("ROLLBACK");
            return next(error);
        }
    });
}
exports.admInsertEvent = admInsertEvent;
function getAllEventsInCampus(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const campus_id = req.body.campus_id;
            const response = yield EventService.getAllEventsInCampus(campus_id);
            res.json(response);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getAllEventsInCampus = getAllEventsInCampus;