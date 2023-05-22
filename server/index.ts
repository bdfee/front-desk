import express from "express";
const app = express();

import patientsRouter from "./controllers/patients";

import { connectToDatabase } from "./utils/connectToDb";
import { PORT } from "./utils/config";
import { requestLogger } from "./middleware/requestLogger";

app.use(express.json());
app.use(requestLogger);
app.use("/api/patients", patientsRouter);

const connect = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
  });
};

void connect();
