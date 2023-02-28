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
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    await EventService.admInsertEvent(
      name,
      email,
      location,
      point,
      img,
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

export async function getAllEventsInCampus(req: any, res: any, next: any){
  try{
      const campus_id = req.body.campus_id as number;
      const response = await EventService.getAllEventsInCampus(campus_id);
      res.json(response);
  } catch (error) {
      return next(error);
  }
}