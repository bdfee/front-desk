import { dropAllTables } from "../tests/helpers/models";

export const isTestDb = () => {
  return process.env.NODE_ENV === "test" || process.env.NODE_ENV === "dev";
};

export const dropTables = async () => {
  if (isTestDb()) {
    await dropAllTables();
    return true;
  } else return false;
};
