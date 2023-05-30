import express from "express";
import { requestLogger } from "./middleware/requestLogger";

import patientsRouter from "./controllers/patients";
import specialistsRouter from "./controllers/specialists";
import appointmentsRouter from "./controllers/appointments";

const app = express();

app.use(express.json());
app.use(requestLogger);

app.use("/api/patients", patientsRouter);
app.use("/api/specialists", specialistsRouter);
app.use("/api/appointments", appointmentsRouter);

export default app;
