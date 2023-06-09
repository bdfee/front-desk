import express from "express";
import { errorHandler, requestLogger, unknownEndpoint } from "./middleware";

import patientsRouter from "./controllers/patients";
import specialistsRouter from "./controllers/specialists";
import appointmentsRouter from "./controllers/appointments";
import userRouter from "./controllers/users";
import loginRouter from "./controllers/login";

const app = express();

app.use(express.json());

app.use(requestLogger);

app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);
app.use("/api/patients", patientsRouter);
app.use("/api/specialists", specialistsRouter);
app.use("/api/appointments", appointmentsRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
