import  moment  from 'moment';
import * as EventDAL from "../../modules/event/EventDAL";
import * as ClubDAL from "../../modules/club/ClubDAL";

export async function admInsertEvent(
  name: string,
  email: string,
  club_id: number,
  student_id: number,
  location: string,
  point: number,
  price: number,
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
    price,
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

export async function admApprovedEvent(event_id: number) {
  const result = await EventDAL.admApprovedEvent(event_id);
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
  return await EventDAL.registerEvent(student_id, event_id, registration_date);
}

export async function payEvent(
  student_id: number,
  event_id: number,
  payment: number
) {
  const event = await EventDAL.getEventById(event_id);
  if (event.length <= 0 && event[0].active !== 1) {
    throw new Error("EventNotExisted")
  }
  return await EventDAL.payEvent(student_id, event_id, payment);
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
      if(student.checkout) {
        throw new Error("AlreadyCheckout");
      }
    }
  });
  if (!checkStudentJoinEvent) {
    throw new Error("NotRegisteredToParticipate");
  }
  await EventDAL.checkoutEvent(student_id, event_id, checkout);
  await EventDAL.insertPointForStudent(student_id, event_id);
  return ;
}

export async function getStudentsJoinEvent(event_id: number) {
  const result = await EventDAL.getStudentsJoinEvent(event_id);
  return result;
}

export async function getEventsStudentJoin(student_id: number) {
  const result = await EventDAL.getEventsStudentJoin(student_id);
  result.forEach((event:any) => {
    event.start_date =  event.start_date ? moment(event.start_date).format('YYYY-MM-DD HH:mm:ss') : null;
    event.end_date =  event.end_date ? moment(event.end_date).format('YYYY-MM-DD HH:mm:ss') : null;
    event.registration_date = event.registration_date ? moment(event.registration_date).format('YYYY-MM-DD HH:mm:ss')  : null;
    event.checkin = event.checkin ? moment(event.checkin).format('YYYY-MM-DD HH:mm:ss') : null;
    event.checkout = event.checkout ? moment(event.checkout).format('YYYY-MM-DD HH:mm:ss') : null;
  })
  return result;
}

export async function getAllEvents(status: number, is_approved: number) {
  const result = await EventDAL.getAllEvents(status, is_approved);
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
