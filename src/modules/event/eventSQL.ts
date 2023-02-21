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