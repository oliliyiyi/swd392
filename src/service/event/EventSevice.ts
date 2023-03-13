import * as EventDAL from "../../modules/event/EventDAL";
import * as ClubDAL from "../../modules/club/ClubDAL";

export async function admInsertEvent(
  name: string,
  email: string,
  club_id: number,
  student_id: number,
  location: string,
  point: number,
  img: string,
  description: string,
  start_date: string,
  end_date: string
) {
  const event = await EventDAL.admInsertEvent(
    name,
    email,
    location,
    point,
    img,
    description,
    start_date,
    end_date
  );
  await EventDAL.admInsertEventOrganizer(
    event?.insertId,
    club_id,
    student_id
  );
  return;
}

export async function getAllEventsInCampus(campus_id: number, status: number, is_approved: number) {
  const result = await EventDAL.getAllEventsInCampus(campus_id, status, is_approved);
  return result;
}

export async function getEventsByName(name: string, status: number) {
  const result = await EventDAL.getEventsByName(name, status);
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

  const event = await EventDAL.getEventById(event_id);
  const result = await EventDAL.registerEvent(
    student_id,
    event_id,
    registration_date
  );
}

export async function checkinEvent(
  student_id: number,
  event_id: number,
  checkin: string
) {
  const studentsJoinEvent = await EventDAL.getStudentsJoinEvent(event_id);
  let checkStudentJoinEvent = false;
  studentsJoinEvent.forEach((student: any) => {
    if (student.student_id === student_id) {
      checkStudentJoinEvent = true;
    }
  });
  if (!checkStudentJoinEvent) {
    await registerEvent(student_id, event_id, checkin);
  }
  return await EventDAL.checkinEvent(student_id, event_id, checkin);
}

export async function checkoutEvent(
  student_id: number,
  event_id: number,
  checkout: string
) {
  const studentsJoinEvent = await EventDAL.getStudentsJoinEvent(event_id);
  let checkStudentJoinEvent = false;
  studentsJoinEvent.forEach((student: any) => {
    if (student.student_id === student_id) {
      checkStudentJoinEvent = true;
      if(!student.checkin){
        throw new Error("NotCheckin")
      }
    }
  });
  if (!checkStudentJoinEvent) {
    throw new Error('NotRegisteredToParticipate')
  }
  return await EventDAL.checkoutEvent(student_id, event_id, checkout);
}

export async function getStudentsJoinEvent(event_id: number) {
  const result = await EventDAL.getStudentsJoinEvent(event_id);
  return result;
}

export async function getAllEvents(status: number, is_approved: number) {
  const result = await EventDAL.getAllEvents(status, is_approved);
  return result;
}

export async function getEventById(event_id: number) {
  const result = await EventDAL.getEventById(event_id);
  return result;
}
