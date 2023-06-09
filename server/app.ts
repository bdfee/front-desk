import express from "express";
import { errorHandler, requestLogger, unknownEndpoint } from "./middleware";
import cors from "cors";

import patientsRouter from "./controllers/patients";
import specialistsRouter from "./controllers/specialists";
import appointmentsRouter from "./controllers/appointments";
import userRouter from "./controllers/users";
import loginRouter from "./controllers/login";
import tasksRouter from "./controllers/tasks";
import dbRouter from "./controllers/db";

const app = express();

app.use(cors());

if (process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "test") {
  app.use("/api/db", dbRouter);
}

app.use(express.json());
app.use(requestLogger);

app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);
app.use("/api/tasks", tasksRouter);
app.use("/api/patients", patientsRouter);
app.use("/api/specialists", specialistsRouter);
app.use("/api/appointments", appointmentsRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
