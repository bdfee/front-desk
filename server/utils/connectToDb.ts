import { Sequelize } from "sequelize";
import { DB_URI, TEST_DB_URI } from "./config";

const isTest = process.env.NODE_ENV === "test" || process.env.NODE_ENV === "dev";

export const sequelize = new Sequelize((isTest ? TEST_DB_URI : DB_URI) as string, { logging: false });

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Connected to the ${isTest ? "test " : ""}database`);
  } catch (err) {
    console.log("Failed to connect to the database:", err);
    process.exit(1);
  }
};
