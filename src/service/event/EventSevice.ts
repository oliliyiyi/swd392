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
