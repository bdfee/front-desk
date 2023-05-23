import express from "express";
const app = express();

import patientsRouter from "./controllers/patients";
import specialistsRouter from "./controllers/specialists";
import appointmentsRouter from "./controllers/appointments";
import calendarRouter from "./controllers/calendar";
import appointmentTypeRouter from "./controllers/appointmentType";

import { connectToDatabase } from "./utils/connectToDb";
import { PORT } from "./utils/config";
import { requestLogger } from "./middleware/requestLogger";

app.use(express.json());
app.use(requestLogger);

app.use("/api/patients", patientsRouter);
app.use("/api/specialists", specialistsRouter);
app.use("/api/appointments", appointmentsRouter);
app.use("/api/calendar", calendarRouter);
app.use("/api/appointmentType", appointmentTypeRouter);

const connect = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
  });
};

void connect();
