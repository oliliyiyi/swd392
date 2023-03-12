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
  const event = await EventDAL.getEventById(event_id);
  const club = await ClubDAL.getClubInfoByClubId(club_id);
  if (
    event.length > 0 &&
    Number(event[0].active) === 1 &&
    club.length > 0 &&
    Number(club[0].active) === 1
  ) {
    const memsClub = await ClubDAL.getAllClubMembers(club_id);
    const mem = memsClub.find((mem: any) => (mem.student_id = student_id));
    if (!mem) {
      throw new Error("NotClubMember");
    }
    await EventDAL.admInsertEventOrganizer(event_id, club_id, student_id);
  } else {
    throw new Error("ClubOrEventNotExisted");
  }
  return;
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
  return await EventDAL.registerEvent(student_id, event_id, registration_date);
}

export async function checkinEvent(
  student_id: number,
  event_id: number,
  checkin: string
) {
  const event = await EventDAL.getEventById(event_id);
  if (event.length > 0 && event[0].active === 1) {
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
  } else {
    throw new Error("EventNotExisted")
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
      if (!student.checkin) {
        throw new Error("NotCheckin");
      }
    }
  });
  if (!checkStudentJoinEvent) {
    throw new Error("NotRegisteredToParticipate");
  }
  return await EventDAL.checkoutEvent(student_id, event_id, checkout);
}

export async function getStudentsJoinEvent(event_id: number) {
  const result = await EventDAL.getStudentsJoinEvent(event_id);
  return result;
}

export async function getAllEvents(status: number) {
  const result = await EventDAL.getAllEvents(status);
  return result;
}

export async function getEventById(event_id: number) {
  const result = await EventDAL.getEventById(event_id);
  return result[0];
}

export async function deleteEvent(event_id: number) {
  const event = await EventDAL.getEventById(event_id);
  if (event.length > 0 && Number(event[0].active) === 1) {
    await EventDAL.deleteEvent(event_id);
  } else {
    throw new Error("EventIsNotExisted");
  }
  return;
}
