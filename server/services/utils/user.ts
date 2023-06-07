import { findAll as find, findByPk, findOneByUsername as findByUsername } from "../../queries/user";

export const findOneById = async (id: number) => {
  const user = await findByPk(id);
  if (!user) {
    throw new Error("no matching user id found");
  }
  return user;
};

export const findAll = async () => find();

export const findOneByUsername = async (username: string) => {
  const user = await findByUsername(username);
  if (!user) {
    throw new Error("no matching username found");
  }
  return user;
};
