export function admInsertEvent( 
    name: string,
    email: string,
    location: string,
    point: number,
    img: string,
    description: string,
    start_date: string,
    end_date: string
    ){
    const query = `INSERT INTO event (name, email, location, point, img, description, start_date, end_date) VALUES(?,?,?,?,?,?,?,?);`;
    const values : any = [name, email, location, point, img, description, start_date, end_date];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
}

export function getAllEventsInCampus(campus_id: number){
    const query = `SELECT tb.event_id, tb.name as event_name, tb.email, tb.location, tb.img, tb.description, tb.point,
    tb.start_date, tb.end_date, tk.club_id, tk.name as club_name, td.student_id, td.name as student_name
    FROM clubs tk
	LEFT JOIN event_organizer tl
    ON tk.club_id = tl.club_id
    INNER JOIN event tb
    ON tb.event_id = tl.event_id
    LEFT JOIN student td
    ON td.student_id = tl.student_id
    WHERE tk.campus_id = ? AND tb.active = 1`;
    const values : any = [campus_id];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
}

export function getEventsByName(name: string){
    const query = `SELECT event_id, name, email, location, point, img, description, start_date, end_date
    FROM event WHERE name LIKE CONCAT('%', ?, '%') AND active = 1 ORDER BY tb.start_date DESC`;
    const values : any = [name];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
}

export function admInsertEventOrganizer(event_id: number, club_id: number, student_id: number){
    const query = `INSERT INTO event_organizer (event_id, club_id, student_id) VALUES (?,?,?);`;
    const values : any = [event_id, club_id, student_id];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
}

export function registerEvent(student_id: number, event_id: number, registration_date: string) {
    const query = `INSERT INTO join_events (student_id, event_id, registration_date) VALUES (?,?,?);`;
    const values : any = [student_id, event_id, registration_date];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
}


export function admApprovedEvent(event_id: number) {
    const query = `UPDATE event SET is_approved = 1 WHERE event_id = ?;`;
    const values: any = [event_id];
    const queryObject = {
      text: query,
      values,
    };
    return queryObject;
  }

export function getStudentsJoinEvent(event_id: number) {
    const query = `SELECT tl.student_id, td.name as student_name, td.dpm_id, tk.name as dpm_name, 
    td.campus_id, tf.name as campus_name, td.email, tl.registration_date , tl.checkin, tl.checkout
    FROM (SELECT * FROM join_events WHERE event_id = ?) tl
    LEFT JOIN student td
    ON tl.student_id = td.student_id
    LEFT JOIN department tk
    ON td.dpm_id = tk.dpm_id
    LEFT JOIN campus tf
    ON td.campus_id = tf.campus_id`
    const values : any = [event_id];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
}

export function getEventsStudentJoin(student_id: number) {
    const query = `SELECT tb.event_id, tb.name, tb.location, tb.img,
    tb.description, tb.start_date, tb.end_date, tl.registration_date , tl.checkin, tl.checkout
    FROM (SELECT * FROM join_events WHERE student_id = ?) tl
    INNER JOIN (SELECT * FROM event WHERE active = 1) tb
    ON tb.event_id = tl.event_id
    ORDER BY tb.start_date DESC`
    const values : any = [student_id];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
}

export function getAllEvents(){
    const query = `SELECT tb.event_id, tb.name as event_name, tb.email, tb.location,tb.point ,tb.img, tb.description, tb.point, 
    tb.start_date, tb.end_date, tk.club_id, tk.name as club_name, td.student_id, td.name as student_name
    FROM (SELECT * FROM event WHERE active = 1) tb
	LEFT JOIN event_organizer tl
    ON tb.event_id = tl.event_id
    LEFT JOIN clubs tk
    ON tk.club_id = tl.club_id
    LEFT JOIN student td
    ON td.student_id = tl.student_id
    WHERE tb.active = 1
    `
    const values : any = [];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
}

export function getEventById(event_id: number) {
    const query = `SELECT tb.event_id, tb.name as event_name, tb.email, tb.location, tb.img, tb.description, tb.point,
    tb.start_date, tb.end_date, tb.active, tb.is_approved, tk.club_id, tk.name as club_name, td.student_id, td.name as student_name
    FROM (SELECT * FROM event WHERE event_id = ?) tb
	LEFT JOIN event_organizer tl
    ON tb.event_id = tl.event_id
    LEFT JOIN clubs tk
    ON tk.club_id = tl.club_id
    LEFT JOIN student td
    ON td.student_id = tl.student_id`
    const values : any = [event_id];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
}

export function checkinEvent(student_id: number, event_id: number, checkin: string) {
    const query = `UPDATE join_events SET checkin = ? WHERE student_id = ? AND event_id = ?;`;
    const values: any = [checkin, student_id, event_id];
    const queryObject = {
      text: query,
      values,
    };
    return queryObject;
  }

export function checkoutEvent(student_id: number, event_id: number, checkout: string) {
    const query = `UPDATE join_events SET checkout = ? WHERE student_id = ? AND event_id = ?;`;
    const values: any = [checkout, student_id, event_id];
    const queryObject = {
      text: query,
      values,
    };
    return queryObject;
  }

export function deleteEvent(event_id: number) {
    const query = `UPDATE event SET active = 0 WHERE event_id = ?;`;
    const values: any = [event_id];
    const queryObject = {
      text: query,
      values,
    };
    return queryObject;
  }

export function getEventPoint(event_id: number) {
    const query = `SELECT point FROM event WHERE event_id = ?`;
    const values: any = [event_id];
    const queryObject = {
      text: query,
      values,
    };
    return queryObject; 
}

export function insertPointForStudent(student_id: number, event_id: number, point: number) {
    const query = `INSERT INTO point(student_id, event_id, point) VALUES (?,?,?)`
    const values: any = [student_id, event_id, point];
    const queryObject = {
      text: query,
      values,
    };
    return queryObject; 
}