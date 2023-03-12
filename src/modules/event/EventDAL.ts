import * as EventSQL from "../../modules/event/eventSQL";
import { query } from "../../configs/db_config";
import * as ClubDAL from "../club/ClubDAL";
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
  const queryString = EventSQL.admInsertEvent(
    name,
    email,
    location,
    point,
    img,
    description,
    start_date,
    end_date
  );
  const rows = await query(queryString.text, queryString.values);
  console.log(rows);
  return;
}

export async function getAllEventsInCampus(campus_id: number, status: number) {
  const queryString = EventSQL.getAllEventsInCampus(campus_id);
  if(status === 1){
    queryString.text = queryString.text + ` WHERE tb.end_date >= current_timestamp()`;
  }
  const rows = await query(queryString.text, queryString.values);
  return rows;
}

export async function getEventsByName(name: string, status: number) {
  const queryString = EventSQL.getEventsByName(name);
  if(status === 1){
    queryString.text = queryString.text + ` AND end_date >= current_timestamp()`;
  }
  const rows = await query(queryString.text, queryString.values);
  return rows;
}

export async function admInsertEventOrganizer(event_id: number, club_id: number, student_id: number) {
  const clubMem = await ClubDAL.getClubMemberInfo(club_id, student_id);
  if(clubMem.length > 0){
    const queryString = EventSQL.admInsertEventOrganizer(event_id, club_id, student_id);
    await query(queryString.text, queryString.values);
  } else {
    throw new Error("NotClubMember");
  }
  return;
}

export async function registerEvent(student_id: number, event_id: number, registration_date: string) {
  const queryString = EventSQL.registerEvent(student_id, event_id, registration_date);
  const rows = await query(queryString.text, queryString.values);
  return rows;
}

export async function getStudentsJoinEvent(event_id: number) {
  const queryString = EventSQL.getStudentsJoinEvent(event_id);
  const studentsJoinEvent = await query(queryString.text, queryString.values);
  return studentsJoinEvent;
}

export async function checkinEvent(student_id: number, event_id: number, checkin: string) {
  const queryString = EventSQL.checkinEvent(student_id, event_id, checkin);
  const rows = await query(queryString.text, queryString.values);
  return rows;
}

export async function checkoutEvent(student_id: number, event_id: number, checkout: string) {
  const queryString = EventSQL.checkoutEvent(student_id, event_id, checkout);
  const rows = await query(queryString.text, queryString.values);
  return rows;
}

export async function getEventById(event_id: number) {
  const queryString = EventSQL.getEventById(event_id);
  const eventById = await query(queryString.text, queryString.values);
  return eventById;
}

export async function getAllEvents(status: number) {
  const queryString = EventSQL.getAllEvents();
  if(status === 1){
    queryString.text = queryString.text + ` WHERE tb.end_date >= current_timestamp()`;
  }
  const studentsJoinEvent = await query(queryString.text, queryString.values);
  return studentsJoinEvent;
}

export async function deleteEvent(event_id: number) {
  const queryString = EventSQL.deleteEvent(event_id);
  const eventById = await query(queryString.text, queryString.values);
  return eventById;
}