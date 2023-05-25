import app from "./app";
import { connectToDatabase } from "./utils/connectToDb";
import { PORT } from "./utils/config";

const connect = async () => {
  console.log("here!");
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
  });
};

void connect();
