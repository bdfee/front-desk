export const isTestDb = () => {
  return process.env.NODE_ENV === "test" || process.env.NODE_ENV === "dev";
};
