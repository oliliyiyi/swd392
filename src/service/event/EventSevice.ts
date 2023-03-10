import * as EventDAL from "../../modules/event/EventDAL";
import * as ClubDAL from "../../modules/club/ClubDAL";

export async function admInsertEvent(
  name: string,
  email: string,
  location: string,
  point: number,
  img: string,
  description: string,
  start_date: string,
  end_date: string
) {
  const result = await EventDAL.admInsertEvent(
    name,
    email,
    location,
    point,
    img,
    description,
    start_date,
    end_date
  );
  return result;
}

export async function getAllEventsInCampus(campus_id: number, status: number) {
  const result = await EventDAL.getAllEventsInCampus(campus_id, status);
  return result;
}

export async function getEventsByName(name: string, status: number) {
  const result = await EventDAL.getEventsByName(name, status);
  return result;
}

export async function admInsertEventOrganizer(
  event_id: number,
  club_id: number,
  student_id: number
) {
  const result = await EventDAL.admInsertEventOrganizer(
    event_id,
    club_id,
    student_id
  );
  return result;
}

export async function registerEvent(
  student_id: number,
  event_id: number,
  registration_date: string
) {
  const studentsJoinEvent = await EventDAL.getStudentsJoinEvent(event_id);
  studentsJoinEvent.forEach((student: any) => {
    if (student.student_id === student_id) {
      throw new Error("StudentAlreadyJoinEvent");
    }
  });
  const result = await EventDAL.registerEvent(
    student_id,
    event_id,
    registration_date
  );
}

export async function getStudentsJoinEvent(event_id: number){
  const result = await EventDAL.getStudentsJoinEvent(event_id);
  return result;
}

export async function getAllEvents(status: number){
  const result = await EventDAL.getAllEvents(status);
  return result;
}

export async function getEventById(event_id: number){
  const result = await EventDAL.getEventById(event_id);
  return result;
}