import { User } from "../models";
import { findAll, findOneById, findOneByUsername } from "./utils/user";
import { validateInput, validateProperties } from "./validation/user";

export const getAll = async (): Promise<User[]> => findAll();

export const getOneByUsername = async (username: string): Promise<User> => findOneByUsername(username);

export const getOneById = async (id: number): Promise<User> => findOneById(id);

export const create = async (object: unknown): Promise<User> => {
  if (validateProperties(object) && validateInput(object)) {
    return User.create(object);
  } else throw new Error("Unknown error creating user");
};
