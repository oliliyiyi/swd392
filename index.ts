import express from "express";
import mysql, { Connection } from "mysql2";

import { router } from "./src/routers/AllRouters";
const app = express();

app.use(express.json());

app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:3000`);
});

export default app;
