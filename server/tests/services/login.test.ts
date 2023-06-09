import { sequelize } from "../../utils/connectToDb";
import { dropUserTable, createTestUser } from "../helpers/models";
import { expectAuthenticatedUser } from "../helpers/shape";
import { login } from "../../services/login";

beforeEach(async () => await dropUserTable());

describe("returned shape from loginService", () => {
  test("login()", async () => {
    const { username } = await createTestUser();
    const loggedInUser = await login({ username, password: "secretpassword" });
    expectAuthenticatedUser(loggedInUser);
  });
});

afterAll(async () => await sequelize.close());
