import * as StudentService from "../../service/student/StudentService";
import { db } from "../../configs/db_config";
import * as fbInit from "../../configs/fbconfigs";
import fs from "fs";

export async function getStudentInfoByEmail(req: any, res: any, next: any) {
  try {
    const email = req.query.email;
    const response = await StudentService.getStudentInfoByEmail(email);
    res.json(response);
  } catch (error) {
    return next(error);
  }
}

export async function getStudentByStudentId(req: any, res: any, next: any) {
  try {
    const student_id = req.params.student_id as number;
    const response = await StudentService.getStudentByStudentId(student_id);
    res.json(response);
  } catch (error) {
    return next(error);
  }
}

export async function getAllStudentInfo(req: any, res: any, next: any) {
  try {

    const response = await StudentService.getAllStudentInfo();
    return res.json(response);
  } catch (error) {
    return next(error);
  }
}

export async function updateStudentInfo(req: any, res: any, next: any) {
  try {
    await db.query("START TRANSACTION");
    const student_id = Number(req.params.student_id);
    const fileGet = req.file;
    const address = req.body.address;
    const phone = req.body.phone;
    const birthday = req.body.birthday;
    let img:any = "";
    if (!fileGet) return res.status(404).json({ message: "File not found" });
    let pathSave = "./src/image/" + fileGet.originalname;
    console.log(pathSave);
    const bucket = fbInit.firebaseConnect.storage().bucket();
    const file = bucket.file(fileGet.originalname);
    const stream = file.createWriteStream({
      resumable: false,
    });
    console.log("file ok");
    var pathImg = "./src/image/" + fileGet.originalname;
    fs.createReadStream(pathImg)
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
      }).then(async (signedUrls) => {
        console.log(signedUrls);
        img = signedUrls[0];
        const response = await StudentService.updateStudentInfo(student_id, img, phone, address, birthday);
        await db.query("COMMIT");
        res.json(response);
      }).catch((error) => {
        console.error("Error getting image URL:", error);
      });
    
  } catch (error: any) {
    await db.query("ROLLBACK");
    res.status(400).json({message: "Action Fail"});
  }
}

export async function getStudentPoint(req: any, res: any, next: any) {
  try {
    const student_id = Number(req.params.student_id);
    const response = await StudentService.getStudentPoint(student_id);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
}
