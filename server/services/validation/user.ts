import { UserLogin, AuthenticatedUser, UserForToken, UserProperties, User } from "../../types";
import { validUserProperties, isUserInput } from "../../typeUtils";
import { isUserLogin } from "../../typeUtils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const validUserLogin = (object: unknown): object is UserLogin => {
  return isUserLogin(object);
};

export const validateProperties = (object: unknown): object is UserProperties => {
  if (!validUserProperties(object)) {
    throw new Error("invalid property on user input");
  }
  return true;
};

export const validateInput = (object: unknown): object is User => {
  if (!isUserInput(object)) {
    throw new Error("malformed or invalid value on user input");
  }
  return true;
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  const match = await bcrypt.compare(password, hash);
  return match;
};

export const authenticateUser = (user: UserForToken, secret: string): AuthenticatedUser => {
  const token = jwt.sign(user, secret);

  if (!token) {
    throw new Error("Unknown server error");
  } else
    return {
      token,
      id: user.id,
      username: user.username,
      name: user.name,
    };
};
