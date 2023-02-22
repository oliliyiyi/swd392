export function getStudentInfoByEmail(email: string) {
  const query = `SELECT student_id, dpm_id, campus_id, name, address, phone, token FROM student WHERE email = ?`;
  const values: any = [email];
  const queryObject = {
    text: query,
    values,
  };
  return queryObject;
}

export function updateStudentToken(studentId: any, refresh_token: string){
    const query = `UPDATE student SET token = ? WHERE student_id = ?`;
    const values : any = [refresh_token,studentId];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
}

export function createStudent(dpmId: any, campusId: any, name: string, address: string, phone: any, email: string, active: any){
    const query = `INSERT INTO student (dpm_id, campus_id, name, address, phone, email, active)
    VALUES (?,?,?,?,?,?,?)`;
    const values : any = [dpmId,campusId,name,address,phone,email,active];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
}

export function getStudent(studentId: any, name: string) {
    const query = `SELECT * FROM student where student_id = ? and name = ?`;
    const values : any = [studentId,name];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
  }
