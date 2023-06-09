import { UserLogin, AuthenticatedUser, UserForToken, UserProperties, User, SafeUser } from "../../types";
import { validUserProperties, isUserInput, isSafeUser } from "../../typeUtils";
import { isUserLogin } from "../../typeUtils";
import { JWT_SECRET } from "../../utils/config";
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

export const validateSafeUser = (object: unknown): object is SafeUser => {
  if (!isSafeUser(object)) {
    throw new Error("invalid value returned from creation");
  }
  return true;
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  const match = await bcrypt.compare(password, hash);
  return match;
};

export const authenticateUser = (user: UserForToken): AuthenticatedUser => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  const token = jwt.sign(user, JWT_SECRET);

  if (!token) {
    throw new Error("Failed to generate token");
  }

  return {
    token,
    id: user.id,
    username: user.username,
    name: user.name,
  };
};
