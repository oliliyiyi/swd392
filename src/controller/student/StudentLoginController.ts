import * as fbInit from "../../../src/configs/fbconfigs";

import jwt from "jsonwebtoken";
import * as Student from "../../service/student/StudentService";
import * as StudentDAL from "../../../src/modules/student/StudentDAL";
import * as redis from '../../configs/rd_config';
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

export async function handleLogin(req: any, res: any) {
  const firebaseToken = req.body.token;
  console.log(req.body.token);
  const device_token = req.body.deviceToken;
  const Redisclient = redis.client;
  let cachedProducts ;
  let tokenDevice;
  if(!cachedProducts){
    Redisclient.set("myTokenDevice",JSON.stringify(device_token),"EX",60);
  }else{
     cachedProducts = await Redisclient.get("myTokenDevice");
     tokenDevice = JSON.parse(cachedProducts);
  }
  if (!firebaseToken) {
    return res.status(404).json({ message: "Token not found!" });
  }
  const roleGet = req.body.role;
  if (!roleGet) {
    return res.status(404).json({ message: "Role not found!" });
  }
  const decodedToken : any = jwt.decode(firebaseToken);
  const now = Date.now() / 1000;
  if (decodedToken.exp && decodedToken.exp < now) {
    console.log("Access token has expired");
    return res.status(401).json({ message: "Access token has expired" });
  } else {
    console.log("Access token is still valid");
  }
  if (decodedToken === null) {
    return res.status(401).json({ message: "Access token invalid!" });
  }

  // fbInit.firebaseConnect
  //   .auth()
  //   .verifyIdToken(firebaseToken)
  //   .then(async (decodedToken: any) => {
      console.log(decodedToken);
      let email = decodedToken.email;
      let arr = email.split("@");
      let domain = arr.pop();
      if (domain !== "fpt.edu.vn")
        return res
          .status(403)
          .json({ message: "Email is not acceptable in system!" });
      else {
        const studentInfo: any = await Student.getStudentInfoByEmail(
          decodedToken.email
        );
        if (studentInfo && roleGet == "admin") {
          console.log(studentInfo);
          const access_token = jwt.sign(
            {
              studentInfo: {
                studentInfoID: studentInfo.student_id,
                name: studentInfo.student_name,
                role: studentInfo.role,
                campus: studentInfo.campus_id,
                
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
                studentId: studentInfo.student_id,
                name: studentInfo.student_name,
                role: studentInfo.role,
                campus: studentInfo.campus_id
              },
            },
            "refreshtokensecret",
            {
              expiresIn: "1d",
            }
          );
          await Student.updateStudentToken(
            studentInfo.student_id,
            refresh_token
          );
          var student_data = {
            id: studentInfo.student_id,
            role: studentInfo.role,
            name: studentInfo.student_name,
            email: studentInfo.email,
            phone: studentInfo.phone,
            campus: studentInfo.campus_id
          };
          // if(device_token){
          // res.cookie("device_token", device_token, {
          //   httpOnly: true,
          //   secure: true,
          //   maxAge: 24 * 60 * 60 * 1000,
          // });}
          res.status(200).json({
            access_token: access_token,
            refresh_token: refresh_token,
            data: student_data,
            device_token: tokenDevice,
            message: "Login successful",
          });
        }  else if(studentInfo && roleGet == "members"){
          console.log(studentInfo);
          const access_token = jwt.sign(
            {
              studentInfo: {
                studentInfoID: studentInfo.student_id,
                name: studentInfo.name,
                role: studentInfo.role,
                campus: studentInfo.campus_id
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
                studentId: studentInfo.student_id,
                name: studentInfo.student_name,
                role: studentInfo.role,
                campus: studentInfo.campus_id
              },
            },
            "refreshtokensecret",
            {
              expiresIn: "1d",
            }
          );
          await Student.updateStudentToken(
            studentInfo.student_id,
            refresh_token
          );
          var student_data = {
            id: studentInfo.student_id,
            role: studentInfo.role,
            name: studentInfo.name,
            email: studentInfo.email,
            phone: studentInfo.phone,
            campus: studentInfo.campus_id
          };
          res.status(200).json({
            access_token: access_token,
            refresh_token: refresh_token,
            data: student_data,
            message: "Login successful",
          });
        }  else{
          const dpmId = 1;
          const campusId = 1;
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
                student_id: studentCreated.student_id,
                name: studentCreated.student_name,
                role: studentCreated.role,
                campus: studentCreated.campus_id
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
                student_id: studentCreated.student_id,
                name: studentCreated.student_name,
                role: studentCreated.role,
                campus: studentCreated.campus_id
              },
            },
            "refreshtokensecret",
            {
              expiresIn: "1d",
            }
          );

          await Student.updateStudentToken(
            studentCreated.student_id,
            refresh_token
          );
          var student_data = {
            id: studentCreated.student_id,
            role: studentCreated.role,
            name: studentCreated.student_name,
            email: studentCreated.email,
            phone: studentCreated.phone,
            campus: studentCreated.campus_id
          };
          res.status(200).json({
            access_token: access_token,
            refresh_token: refresh_token,
            data: student_data,
            message: "Login successful",
          });
        }
      }
    // });
}
