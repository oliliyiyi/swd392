export function getAcountStudentLogin(account: string, password: string){
    const query = `SELECT account,
                    student_id
                    FROM student_account
                    WHERE account = $1 AND password = $2`;
    const values : any = [account, password];
    const queryObject = {
        text: query,
        values
    };
    return queryObject;
}