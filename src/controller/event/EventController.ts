import * as EventService from "../../service/event/EventSevice";
import { db } from "../../configs/db_config";

export async function admInsertEvent(req: any, res: any, next: any) {
  try {
    await db.query("START TRANSACTION");
    const name = req.body.name;
    const email = req.body.email;
    const location = req.body.location;
    const point = req.body.point;
    const img = req.body.img;
    const description = req.body.description;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    await EventService.admInsertEvent(
      name,
      email,
      location,
      point,
      img,
      description,
      start_date,
      end_date
    );
    await db.query("COMMIT");
    res.json();
  } catch (error) {
    await db.query("ROLLBACK");
    return next(error);
  }
}

export async function getAllEventsInCampus(req: any, res: any, next: any) {
  try {
    const campus_id : number= req.params.campus_id as number;
    const response = await EventService.getAllEventsInCampus(campus_id);
    res.json(response);
  } catch (error) {
    return next(error);
  }
}

export async function getEventsByName(req: any, res: any, next: any) {
  try {
    const name = req.query.name;
    const response = await EventService.getEventsByName(name);
    res.json(response);
  } catch (error) {
    return next(error);
  }
}

export async function admInsertEventOrganizer(req: any, res: any, next: any) {
  try {
    await db.query("START TRANSACTION");
    const event_id = req.body.event_id;
    const club_id = req.body.club_id;
    const student_id = req.body.student_id;
    await EventService.admInsertEventOrganizer(event_id, club_id, student_id);
    await db.query("COMMIT");
    res.json();
  } catch (error: any) {
    await db.query("ROLLBACK");
    if (error.message === "NotClubMember"){
      res.status(400).json({message: "This student is not a club member"})
    } else {
      return next(error);
    }    
  }
}

export async function registerEvent(req: any, res: any, next: any) { 
  try{
    await db.query("START TRANSACTION");
    const student_id = req.body.student_id;
    const event_id = req.body.event_id;
    const registration_date = req.body.registration_date;
    await EventService.registerEvent(student_id, event_id, registration_date);
    await db.query("COMMIT");
    res.json();
  } catch (error: any) {
    await db.query("ROLLBACK");
    if (error.message === "StudentAlreadyJoinEvent"){
      res.status(400).json({message: "This student is already join event"})
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