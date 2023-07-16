import { AuthenticatedUser } from "../types";
import { validUserLogin, comparePassword, authenticateUser } from "./validation/user";
import { getOneByUsername } from "./user";

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

    return authenticateUser({
      username: user.username,
      name: user.name,
      userId: user.userId,
    });
  } catch (error) {
    throw new Error("Error logging in: " + (error instanceof Error ? error.message : "Unknown server error"));
  }
};
