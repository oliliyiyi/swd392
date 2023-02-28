export function admInsertEvent( 
    name: string,
    email: string,
    location: string,
    point: number,
    img: string,
    start_date: string,
    end_date: string
    ){
    const query = `INSERT INTO event (name, email, location, point, img, start_date, end_date) VALUES(?,?,?,?,?,?,?)`;
    const values : any = [name, email, location, point, img, start_date, end_date];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
}

export function getAllEventsInCampus(campus_id: number){
    const query = `SELECT tb.event_id, tb.name as event_name, tb.email, tb.location, tb.img, 
    tb.start_date, tb.end_date, tl.club_id, tk.name as club_name FROM event tb
    INNER JOIN event_organizer tl
    ON tb.event_id = tl.event_id
    LEFT JOIN (SELECT * FROM clubs WHERE campus_id = ?) tk
    ON tk.club_id = tl.club_id;`;
    const values : any = [campus_id];
    const queryObject = {
        text: query,
        values
    };
    return queryObject
}