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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePostFile = exports.handlepushNotification = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fbInit = __importStar(require("../configs/fbconfigs"));
function handlepushNotification(req, res, next) {
    const pushOption = req.body.send_option;
    if (!pushOption || (pushOption !== "topic" && pushOption !== "device"))
        return res.status(400).json({ message: `Please select true option (\"topic\" or \"device\" - one of them)!` });
    if (pushOption === "topic") {
        const topic = req.body.topic;
        const title = req.body.title;
        const content = req.body.content;
        if (!topic)
            return res.status(400).json({ message: "Please input topic name!" });
        if (!title)
            return res.status(400).json({ message: "Please input title name!" });
        if (!content)
            return res.status(400).json({ message: "Please input content!" });
        const message = {
            notification: {
                title: title,
                body: content,
            },
            topic: topic
        };
        fbInit.firebaseConnect
            .messaging()
            .send(message)
            .then((response) => {
            console.log("Successfully sent message with topic:", response);
            res.status(200).json({ message: "Successfully sent message", data: response });
        })
            .catch((error) => {
            console.error("Error sending message with topic:", error);
            res.status(500).json({ message: `Error sending message (${error})` });
        });
    }
    else if (pushOption === "device") {
        const fcmToken = req.body.device_token;
        if (!fcmToken) {
            return res.status(404).json({ message: "Token device not found!" });
        }
        const title = req.body.title;
        if (!title)
            return res.status(400).json({ message: "Please input title name!" });
        const content = req.body.content;
        if (!content)
            return res.status(400).json({ message: "Please input content!" });
        const message = {
            notification: {
                title: title,
                body: content,
            },
            token: fcmToken,
        };
        fbInit.firebaseConnect
            .messaging()
            .send(message)
            .then((response) => {
            console.log("Successfully sent message with particular device:", response);
            res.status(200).json({ message: "Successfully sent message with particular device", data: response });
        })
            .catch((error) => {
            console.error("Error sending message with particular device:", error);
            res.status(500).json({ message: `Error sending message with particular device (${error})` });
        });
    }
}
exports.handlepushNotification = handlepushNotification;
function handlePostFile(req, res) {
    var fileGet = req.files.file;
    if (!fileGet)
        return res.status(404).json({ message: "File not found" });
    const parentDirectory = path_1.default.dirname(__dirname);
    console.log(parentDirectory);
    let pathSave = parentDirectory + "/image_folder/" + fileGet.name;
    console.log(pathSave);
    const bucket = fbInit.firebaseConnect.storage().bucket();
    const file = bucket.file(fileGet.name);
    const stream = file.createWriteStream({
        resumable: false,
    });
    fileGet.mv(pathSave, function (err) {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Server error!" });
        }
        else {
            console.log("file ok");
            var pathImg = parentDirectory + "/image/" + fileGet.name;
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
                .then((signedUrls) => {
                console.log(signedUrls);
                fs_1.default.unlink(pathImg, (err) => {
                    if (err)
                        throw err;
                    console.log(`${pathImg} was deleted`);
                });
                res.status(200).json({ data: signedUrls[0], message: "Successfully uploaded image" });
            })
                .catch((error) => {
                console.error("Error getting image URL:", error);
                res.status(500).json({ message: "Error get link image from firebase!" });
            });
        }
    });
}
exports.handlePostFile = handlePostFile;
;
