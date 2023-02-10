export function getAllListCampus(){
    const query = `SELECT campus_id,
                    name,
                    address,
                    created_at,
                    updated_at
                    FROM public.campus`;
    const values : any = [];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
}