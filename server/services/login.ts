import { AuthenticatedUser } from "../types";
import { validUserLogin, comparePassword, authenticateUser } from "./validation/user";
import { getOneByUsername } from "./user";
import { JWT_SECRET } from "../utils/config";

export const login = async (object: unknown): Promise<AuthenticatedUser> => {
  try {
    if (!validUserLogin(object)) {
      throw new Error("malformed or missing user login");
    }
    const { username, password } = object;

    const user = await getOneByUsername(username);

    const passwordCorrect = await comparePassword(password, user.password);

    if (!passwordCorrect) {
      throw new Error("invalid username or password");
    }

    if (!JWT_SECRET) {
      throw new Error("Unknown server error");
    }
    return authenticateUser(user, JWT_SECRET);
  } catch (error) {
    throw new Error("Unknown server error");
  }
};
