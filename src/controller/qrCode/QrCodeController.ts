import * as QRCode from 'qrcode';
import * as fbInit from "../../configs/fbconfigs";
import { Readable } from 'stream';


export async function getEventIdByQrCode(req: any, res: any, next: any) {
    try {
        const eventId = req.params.eventId as number;
        const status = req.query.status;
        console.log(req.params.eventId);
        const qrcodeData = { event_id: eventId, 
        status: status};
        let img = '';
        let qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(qrcodeData));
        console.log(qrCodeDataUrl);
        const buffer = Buffer.from(qrCodeDataUrl.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        const bucket = fbInit.firebaseConnect.storage().bucket();
        const file = bucket.file(`qr-codes/${eventId}-qr-code.png`);
        const stream = file.createWriteStream({
            resumable: false,
        });
        const readable = new Readable();
        readable._read = () => { };
        readable.push(buffer);
        readable.push(null);
        console.log("file ok");
        readable.pipe(stream)
            .on("error", (error: any) => {
                console.error("Error uploading image:", error);
                return res.status(500).json({ message: "Upload file to firebase error!" });
            })
            .on("finish", () => {
                console.log("Successfully uploaded image.");
                file.getSignedUrl({
                    action: "read",
                    expires: "01-01-2030",
                }).then(async (signedUrls: string[]) => {
                    console.log(signedUrls);
                    img = signedUrls[0];
                    console.log(img);
                    res.status(200).json({data: img, message: "Successfully uploaded image"});
                }).catch((error: any) => {
                    console.error("Error getting image URL:", error);
                    return res.status(500).json({ message: "Error getting image URL." });
                });
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error uploading QR code to Firebase." });
    }
}