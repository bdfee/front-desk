import { User } from "../models";
import { SafeUser } from "../types";
import { findAll, findOneByPk, findOneByUsername, findCreatedByPk } from "./utils/user";
import { validateInput, validateProperties, validateSafeUser } from "./validation/user";

export const getAll = async (): Promise<User[]> => findAll();

export const getOneByUsername = async (username: string): Promise<User> => findOneByUsername(username);

export const getOneById = async (id: number): Promise<User> => findOneByPk(id);

export const create = async (object: unknown): Promise<SafeUser> => {
  if (validateProperties(object) && validateInput(object)) {
    const { id } = await User.create(object);
    const user = await findCreatedByPk(id);
    if (validateSafeUser(user)) {
      return user;
    } else {
      throw new Error("Error validating safe user");
    }
  } else throw new Error("Error validating user input");
};
