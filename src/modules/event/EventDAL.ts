import * as EventSQL from "../../modules/event/eventSQL";
import { query } from "../../configs/db_config";
import * as ClubDAL from "../club/ClubDAL";
export async function admInsertEvent(
  name: string,
  email: string,
  location: string,
  point: number,
  img: string,
  start_date: string,
  end_date: string
) {
  const queryString = EventSQL.admInsertEvent(
    name,
    email,
    location,
    point,
    img,
    start_date,
    end_date
  );
  const rows = await query(queryString.text, queryString.values);
  console.log(rows);
  return;
}

export async function getAllEventsInCampus(campus_id: number) {
  const queryString = EventSQL.getAllEventsInCampus(campus_id);
  const rows = await query(queryString.text, queryString.values);
  return rows;
}

export async function getEventsByName(name: string) {
  const queryString = EventSQL.getEventsByName(name);
  const rows = await query(queryString.text, queryString.values);
  return rows;
}

export async function admInsertEventOrganizer(event_id: number, club_id: number, student_id: number) {
  var status = false; 
  const clubMem = await ClubDAL.getClubMemberInfo(club_id, student_id);
  if(clubMem.length > 0){
    const queryString = EventSQL.admInsertEventOrganizer(event_id, club_id, student_id);
    await query(queryString.text, queryString.values);
  } else {
    var error = {};
    throw new Error("NotClubMember");
  }
  return;
}
