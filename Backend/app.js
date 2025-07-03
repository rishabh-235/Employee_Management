import express from "express";
import cors from "cors";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const app = express();

app.use(
  cors({
    //cors origin is use to specify url from which the request we are getting.
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));

import leadRoutes from "./routes/leads.route.js";
import employeeRoutes from "./routes/employee.route.js";
app.use("/api/leads", upload.single("file"), leadRoutes);
app.use("/api/employees", employeeRoutes);

export { app };