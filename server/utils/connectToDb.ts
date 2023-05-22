import { Sequelize } from "sequelize";
import { DB_URI } from "./config";

export const sequelize = new Sequelize(DB_URI as string);

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database");
  } catch (err) {
    console.log("Failed to connect to the database:", err);
    process.exit(1);
  }
};
