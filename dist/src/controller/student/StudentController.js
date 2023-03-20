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
exports.getStudentPoint = exports.updateStudentInfo = exports.getAllStudentInfo = exports.getStudentByStudentId = exports.getStudentInfoByEmail = void 0;
const StudentService = __importStar(require("../../service/student/StudentService"));
const db_config_1 = require("../../configs/db_config");
const fbInit = __importStar(require("../../configs/fbconfigs"));
const fs_1 = __importDefault(require("fs"));
function getStudentInfoByEmail(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const email = req.query.email;
            const response = yield StudentService.getStudentInfoByEmail(email);
            res.json(response);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getStudentInfoByEmail = getStudentInfoByEmail;
function getStudentByStudentId(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const student_id = req.params.student_id;
            const response = yield StudentService.getStudentByStudentId(student_id);
            res.json(response);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getStudentByStudentId = getStudentByStudentId;
function getAllStudentInfo(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield StudentService.getAllStudentInfo();
            return res.json(response);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getAllStudentInfo = getAllStudentInfo;
function updateStudentInfo(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_config_1.db.query("START TRANSACTION");
            const student_id = Number(req.params.student_id);
            const fileGet = req.file;
            const address = req.body.address;
            const phone = req.body.phone;
            const birthday = req.body.birthday;
            let img = "";
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
            }).then((signedUrls) => __awaiter(this, void 0, void 0, function* () {
                console.log(signedUrls);
                img = signedUrls[0];
                const response = yield StudentService.updateStudentInfo(student_id, img, phone, address, birthday);
                yield db_config_1.db.query("COMMIT");
                res.json(response);
            })).catch((error) => {
                console.error("Error getting image URL:", error);
            });
        }
        catch (error) {
            yield db_config_1.db.query("ROLLBACK");
            res.status(400).json({ message: "Action Fail" });
        }
    });
}
exports.updateStudentInfo = updateStudentInfo;
function getStudentPoint(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const student_id = Number(req.params.student_id);
            const response = yield StudentService.getStudentPoint(student_id);
            return res.json(response);
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getStudentPoint = getStudentPoint;
