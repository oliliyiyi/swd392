const jwt = require("jsonwebtoken");

export function verifyToken(req: any, res: any, next: any) {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);
  try {
    const decoded = jwt.verifyToken(token, "mysecret");
    req.userId = decoded.id
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }
};
