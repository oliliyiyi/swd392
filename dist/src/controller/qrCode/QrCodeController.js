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
exports.getEventIdByQrCode = void 0;
const QRCode = __importStar(require("qrcode"));
const fbInit = __importStar(require("../../configs/fbconfigs"));
const stream_1 = require("stream");
function getEventIdByQrCode(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const eventId = req.params.eventId;
            console.log(req.params.eventId);
            const qrcodeData = { event_id: eventId };
            let img = '';
            let qrCodeDataUrl = yield QRCode.toDataURL(JSON.stringify(qrcodeData));
            console.log(qrCodeDataUrl);
            const buffer = Buffer.from(qrCodeDataUrl.replace(/^data:image\/\w+;base64,/, ""), 'base64');
            const bucket = fbInit.firebaseConnect.storage().bucket();
            const file = bucket.file(`qr-codes/${eventId}-qr-code.png`);
            const stream = file.createWriteStream({
                resumable: false,
            });
            const readable = new stream_1.Readable();
            readable._read = () => { };
            readable.push(buffer);
            readable.push(null);
            console.log("file ok");
            readable.pipe(stream)
                .on("error", (error) => {
                console.error("Error uploading image:", error);
                return res.status(500).json({ message: "Upload file to firebase error!" });
            })
                .on("finish", () => {
                console.log("Successfully uploaded image.");
                file.getSignedUrl({
                    action: "read",
                    expires: "01-01-2030",
                }).then((signedUrls) => __awaiter(this, void 0, void 0, function* () {
                    console.log(signedUrls);
                    img = signedUrls[0];
                    console.log(img);
                    res.status(200).json({ data: img, message: "Successfully uploaded image" });
                })).catch((error) => {
                    console.error("Error getting image URL:", error);
                    return res.status(500).json({ message: "Error getting image URL." });
                });
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error uploading QR code to Firebase." });
        }
    });
}
exports.getEventIdByQrCode = getEventIdByQrCode;
