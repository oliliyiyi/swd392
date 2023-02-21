import * as StudentService from "../../service/student/StudentService";

const jwt = require("jsonwebtoken");
const users = [
  {
    id: 1,
    username: "Henry",
  },
  {
    id: 2,
    username: "Jim",
  },
];

export async function loginAcountStudent(req: any, res: any, next: any) {
  try {
    const account = req.body.account;
    const password = req.body.password;
    const accountStudent = StudentService.getAcountStudentLogin;
    if (!accountStudent) return res.sendStatus(401);
    //create JWT
    const accessToken = jwt.sign(accountStudent, "mysecret", {
        expiresIn: '20m'
    });
    res.json({ accessToken });
  } catch (error) {
    return next(error);
  }
}
