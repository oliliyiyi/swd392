import * as EventDAL from "../../modules/event/EventDAL";

export async function admInsertEvent(
  name: string,
  email: string,
  location: string,
  point: number,
  img: string,
  start_date: string,
  end_date: string
) {
  const result = await EventDAL.admInsertEvent(
    name,
    email,
    location,
    point,
    img,
    start_date,
    end_date
  );
  return result;
}

export async function getAllEventsInCampus(campus_id: number) {
  const result = await EventDAL.getAllEventsInCampus(campus_id);
  return result;
}

export async function getEventsByName(name: string) {
  const result = await EventDAL.getEventsByName(name);
  return result;
}

export async function admInsertEventOrganizer(event_id: number, club_id: number, student_id: number) {
  const result = await EventDAL.admInsertEventOrganizer(event_id, club_id, student_id);
  return result;
}