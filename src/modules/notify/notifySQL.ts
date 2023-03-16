export function InsertNotifyById( 
    deviceToken: string,
    title: string,
    content: string,
    student_id: number
    ){
    const query = `INSERT INTO notify  (deviceToken, title, content,student_id) VALUES(?,?,?,?);`;
    const values : any = [deviceToken, title, content, student_id];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
}

export function getNotifyById(student_id: number) {
    const query = `SELECT nt.title, nt.content
    FROM student st
    inner JOIN notify nt
    ON st.student_id = nt.student_id
    WHERE st.student_id = ?`;
    const values: any = [student_id];
    const queryObject = {
      text: query,
      values,
    };
    return queryObject;
  }