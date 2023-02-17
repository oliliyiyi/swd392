export function getAllCampus() {
  const query = `SELECT campus_id,
                    name,
                    address,
                    created_at,
                    updated_at
                    FROM campus`;
  const values: any = [];
  const queryObject = {
    text: query,
    values,
  };
  return queryObject;
}
