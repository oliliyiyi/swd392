import * as EventService from "../../service/event/EventSevice";
import { db } from "../../configs/db_config";
import * as fbInit from "../../configs/fbconfigs";
import fs from "fs";

export async function admInsertEvent(req: any, res: any, next: any) {
  
  try {
    const name = req.body.name;
    const email = req.body.email;
    const club_id = Number(req.body.club_id);
    const student_id = Number(req.body.student_id);
    const location = req.body.location;
    const point = req.body.point;
    const fileGet = req.file;
    let img:any = "";
    const description = req.body.description;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    await db.query("START TRANSACTION");
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
      })
      .then(async (signedUrls) => {
        console.log(signedUrls);
        img = signedUrls[0];
        // fs.unlink(pathImg, (err) => {
        //   if (err) throw err;
        //   console.log(`${pathImg} was deleted`);
        // });
        await EventService.admInsertEvent(
          name,
          email,
          club_id,
          student_id,
          location,
          point,
          img,
          description,
          start_date,
          end_date
        );
        await db.query("COMMIT");
        res.json();
        // res.status(200).json({ data: signedUrls[0], message: "Successfully uploaded image" });
      })
      .catch((error) => {
        console.error("Error getting image URL:", error);
       //res.status(500).json({ message: "Error get link image from firebase!" });
      });
  } catch (error: any) {
    await db.query("ROLLBACK");
    if (error.message === "NotClubMember") {
      res.status(400).json({ message: "This student is not a club member" })
    } else {
      return next(error);
    }
    return next(error);
  }
}

export async function admApprovedEvent(req: any, res: any, next: any) {
  try {
    await db.query("START TRANSACTION");
    const event_id = req.params.event_id;
    await EventService.admApprovedEvent(event_id);
    await db.query("COMMIT");
    res.json();
  } catch (error: any) {
    await db.query("ROLLBACK");
    return next(error);
  }
}

export async function getAllEventsInCampus(req: any, res: any, next: any) {
  try {
    const campus_id: number = req.params.campus_id as number;
    const status = Number(req.query.status || 0);
    const is_approved = Number(req.query.is_approved || 0);
    const response = await EventService.getAllEventsInCampus(campus_id, status, is_approved);
    res.json(response);
  } catch (error) {
    return next(error);
  }
}

export async function getEventsByName(req: any, res: any, next: any) {
  try {
    const name = req.query.name;
    const status = Number(req.query.status || 0);
    const response = await EventService.getEventsByName(name, status);
    res.json(response);
  } catch (error) {
    return next(error);
  }
}

export async function getEventById(req: any, res: any, next: any) {
  try {
    const id = req.params.event_id;
    const response = await EventService.getEventById(id);
    res.json(response);
  } catch (error) {
    return next(error);
  }
}

export async function registerEvent(req: any, res: any, next: any) {
  try {
    await db.query("START TRANSACTION");
    const student_id = req.body.student_id;
    const event_id = req.body.event_id;
    const registration_date = req.body.registration_date;
    await EventService.registerEvent(student_id, event_id, registration_date);
    await db.query("COMMIT");
    res.json();
  } catch (error: any) {
    await db.query("ROLLBACK");
    if (error.message === "StudentAlreadyJoinEvent") {
      res.status(400).json({ message: "This student is already join event" })
    }
    return next(error);
  }
}

export async function checkinEvent(req: any, res: any, next: any) {
  try {
    await db.query("START TRANSACTION");
    const student_id = req.body.student_id;
    const event_id = req.params.event_id;
    const checkin = req.body.checkin;
    await EventService.checkinEvent(student_id, event_id, checkin);
    await db.query("COMMIT");
    res.json();
  } catch (error: any) {
    await db.query("ROLLBACK");
    if (error.message === "EventNotExisted") {
      res.status(400).json({ message: "Event does not existed" })
    }
    return next(error);
  }
}

export async function checkoutEvent(req: any, res: any, next: any) {
  try {
    await db.query("START TRANSACTION");
    const student_id = req.body.student_id;
    const event_id = req.params.event_id;
    const checkout = req.body.checkout;
    await EventService.checkoutEvent(student_id, event_id, checkout);
    await db.query("COMMIT");
    res.json();
  } catch (error: any) {
    await db.query("ROLLBACK");
    if (error.message === "NotCheckin") {
      res.status(400).json({ message: "Students have not checked in the event" })
    }
    if (error.message === "NotRegisteredToParticipate") {
      res.status(400).json({ message: "Students have not registerd to participate event" })
    }
    return next(error);
  }
}

export async function getStudentsJoinEvent(req: any, res: any, next: any) {
  try {
    const event_id = req.params.event_id as number;
    const response = await EventService.getStudentsJoinEvent(event_id);
    res.json(response);
  } catch (error) {
    return next(error);
  }
}

export async function getEventsStudentJoin(req: any, res: any, next: any) {
  try {
    const student_id: number = req.params.student_id as number;
    const response = await EventService.getEventsStudentJoin(student_id);
    res.json(response);
  } catch (error) {
    return next(error);
  }
}

export async function getAllEvents(req: any, res: any, next: any) {
  try {
    const status: number = Number(req.query.status || 0);
    const is_approved: number = Number(req.query.is_approved || 0); 
    const response = await EventService.getAllEvents(status, is_approved);
    res.json(response);
  } catch (error) {
    return next(error);
  }
}

export async function deleteEvent(req: any, res: any, next: any) {
  try {
    await db.query("START TRANSACTION");
    const event_id = Number(req.params.event_id);
    await EventService.deleteEvent(event_id);
    await db.query("COMMIT");
    res.json();
  } catch (error: any) {
    await db.query("ROLLBACK");
    if (error.message === "EventIsNotExisted") {
      res.status(400).json({ message: "Event is not existed" })
    }
    return next(error);
  }
}