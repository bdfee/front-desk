import { User } from "../models";
import { SafeUser } from "../types";
import { findAll, findOneByPk, findOneByUsername, findCreatedByPk } from "./utils/user";
import { validateInput, validateProperties, validateSafeUser } from "./validation/user";

export const getAll = async (): Promise<User[]> => findAll();

export const getOneByUsername = async (username: string): Promise<User> => findOneByUsername(username);

export const getOneById = async (id: number): Promise<User> => findOneByPk(id);

export const create = async (object: unknown): Promise<SafeUser> => {
  if (validateProperties(object) && validateInput(object)) {
    console.log("valid", object);
    const { id } = await User.create(object);
    console.log("id", id);
    const user = await findCreatedByPk(id);
    console.log("user", user);
    if (validateSafeUser(user)) {
      return user;
    } else {
      throw new Error("Error validating safe user");
    }
  } else throw new Error("Error validating user input");
};
