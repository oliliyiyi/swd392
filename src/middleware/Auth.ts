// const jwt = require("jsonwebtoken");

// export function verifyToken(req: any, res: any, next: any) {
//   const authHeader = req.header("Authorization");
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) return res.sendStatus(401);
//   try {
//     const decoded = jwt.verifyToken(token, "mysecret");
//     req.userId = decoded.id
//     next();
//   } catch (error) {
//     console.log(error);
//     return res.sendStatus(403);
//   }
// };
import * as Student from "../service/student/StudentService";

export async function isAuth(req: any, res: any, next: any) {
  var jwt = require("jsonwebtoken");
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer "))
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided!" });
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err: any, decoded: any) => {
    if (err) return res.status(401).json({ message: err.message }); //invalid token
    const studentCreated: any = await  Student.getStudent(decoded.studentInfo.studentId,decoded.studentInfo.name);
        if (studentCreated[0].token === "") {
          return res.status(401).json({ message: "Access token expires !" });
        } else {
          req.studentId = decoded.studentInfo.studentId;
          req.name = decoded.studentInfo.name;
          next();
        }
      }
    );
};


