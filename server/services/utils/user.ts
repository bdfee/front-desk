import {
  findAll as find,
  findByPk,
  findOneByUsername as findByUsername,
  findCreatedByPk as findCreated,
} from "../../queries/user";

export const findOneByPk = async (id: number) => {
  const user = await findByPk(id);
  if (!user) {
    throw new Error("no matching user id found");
  }
  return user;
};

export const findCreatedByPk = async (id: number) => {
  const safeUser = await findCreated(id);
  if (!safeUser) {
    throw new Error("no matching user id found");
  }
  return safeUser;
};

export const findAll = async () => find();

export const findOneByUsername = async (username: string) => {
  const user = await findByUsername(username);
  if (!user) {
    throw new Error("no matching username found");
  }
  return user;
};
