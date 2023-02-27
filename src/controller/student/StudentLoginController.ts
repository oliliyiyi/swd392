import * as fbInit from "../../../src/configs/fbconfigs";

import jwt from "jsonwebtoken";
import * as Student from "../../service/student/StudentService";
import * as StudentDAL from "../../../src/modules/student/StudentDAL";
// const users = [
//   {
//     id: 1,
//     username: "Henry",
//   },
//   {
//     id: 2,
//     username: "Jim",
//   },
// ];

// export async function loginAcountStudent(req: any, res: any, next: any) {
//   try {
//     const account = req.body.account;
//     const password = req.body.password;
//     const accountStudent = StudentService.getInfoStudentLogin;
//     if (!accountStudent) return res.sendStatus(401);

//     //create JWT
//     const accessToken = jwt.sign(accountStudent, "mysecret", {
//         expiresIn: '20m'
//     });
//     res.json({ accessToken });
//   } catch (error) {
//     return next(error);
//   }
// }

export function handleLogin(req: any, res: any, next: any) {
  const firebaseToken = req.body.token;
  console.log(req.body.token);
  if (!firebaseToken) {
    return res.status(404).json({ message: "Token not found!" });
  }
  const roleGet = req.body.role;
  if (!roleGet) {
    return res.status(404).json({ message: "Role not found!" });
  }
  fbInit.firebaseConnect
    .auth()
    .verifyIdToken(firebaseToken)
    .then(async (decodedToken: any) => {
      console.log(decodedToken);
      let email = decodedToken.email;
      let arr = email.split("@");
      let domain = arr.pop();
      if (domain !== "fpt.edu.vn")
        return res
          .status(403)
          .json({ message: "Email is not acceptable in system!" });
      else {
        const studentInfo: any = await Student.getInfoStudentLogin(
          decodedToken.email
        );
        if (studentInfo.length > 0 && roleGet == "admin") {
          console.log(studentInfo);
          const access_token = jwt.sign(
            {
              studentInfo: {
                studentInfoID: studentInfo[0].student_id,
                name: studentInfo[0].name,
                role: studentInfo[0].role,
              },
            },
            "accesstokensecret",
            {
              expiresIn: "15m",
            }
          );
          const refresh_token = jwt.sign(
            {
              studentInfo: {
                studentId: studentInfo[0].student_id,
                name: studentInfo[0].name,
                role: studentInfo[0].role,
              },
            },
            "refreshtokensecret",
            {
              expiresIn: "1d",
            }
          );
          await Student.updateStudentToken(
            studentInfo[0].student_id,
            refresh_token
          );
          var student_data = {
            id: studentInfo[0].student_id,
            role: studentInfo[0].role,
            name: studentInfo[0].name,
            email: studentInfo[0].email,
            phone: studentInfo[0].phone,
          };
          res.status(200).json({
            access_token: access_token,
            refresh_token: refresh_token,
            data: student_data,
            message: "Login successful",
          });
        }  else if(studentInfo.length > 0 && roleGet == "members"){
          console.log(studentInfo);
          const access_token = jwt.sign(
            {
              studentInfo: {
                studentInfoID: studentInfo[0].student_id,
                name: studentInfo[0].name,
                role: studentInfo[0].role,
              },
            },
            "accesstokensecret",
            {
              expiresIn: "15m",
            }
          );
          const refresh_token = jwt.sign(
            {
              studentInfo: {
                studentId: studentInfo[0].student_id,
                name: studentInfo[0].name,
                role: studentInfo[0].role,
              },
            },
            "refreshtokensecret",
            {
              expiresIn: "1d",
            }
          );
          await Student.updateStudentToken(
            studentInfo[0].student_id,
            refresh_token
          );
          var student_data = {
            id: studentInfo[0].student_id,
            role: studentInfo[0].role,
            name: studentInfo[0].name,
            email: studentInfo[0].email,
            phone: studentInfo[0].phone,
          };
          res.status(200).json({
            access_token: access_token,
            refresh_token: refresh_token,
            data: student_data,
            message: "Login successful",
          });
        }  else{
          const dpmId = 1;
          const campusId = 2;
          const active = 1;
          const address = "abc";
          const phone = "123456789";
          await Student.createStudent(
            dpmId,
            campusId,
            decodedToken.name,
            address,
            phone,
            decodedToken.email,
            roleGet,
            active
          );
          const studentCreated = await StudentDAL.getStudentInfoByEmail(
            decodedToken.email
          );
          const access_token = jwt.sign(
            {
              studentInfo: {
                student_id: studentCreated[0].student_id,
                name: studentCreated[0].name,
                role: studentCreated[0].role
              },
            },
            "accesstokensecret",
            {
              expiresIn: "15m",
            }
          );
          const refresh_token = jwt.sign(
            {
              studentInfo: {
                student_id: studentCreated[0].student_id,
                name: studentCreated[0].name,
                role: studentCreated[0].role
              },
            },
            "refreshtokensecret",
            {
              expiresIn: "1d",
            }
          );

          await Student.updateStudentToken(
            studentCreated[0].student_id,
            refresh_token
          );
          var student_data = {
            id: studentCreated[0].student_id,
            role: studentCreated[0].role,
            name: studentCreated[0].name,
            email: studentCreated[0].email,
            phone: studentCreated[0].phone,
          };
          res.status(200).json({
            access_token: access_token,
            refresh_token: refresh_token,
            data: student_data,
            message: "Login successful",
          });
        }
      }
    });
}
