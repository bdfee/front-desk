import { sequelize } from "../../utils/connectToDb";
import { dropUserTable, createTestUser, createTestSpecificUser } from "../helpers/models";
import { create, getAll, getOneById, getOneByUsername } from "../../services/user";
import { expectSafeUser, expectDangerousUser } from "../helpers/shape";
import { User } from "../../models";

beforeEach(async () => await dropUserTable());

describe("returned shape from userService", () => {
  test("getAll()", async () => {
    await createTestUser();
    const userList = await getAll();
    expectDangerousUser(userList[0]);
  });

  test("getOneById()", async () => {
    const { id } = await createTestUser();
    expectDangerousUser(await getOneById(id));
  });

  test("getOneByUsername()", async () => {
    const { username } = await createTestUser();
    expectDangerousUser(await getOneByUsername(username));
  });

  test("create()", async () => {
    const user = await create({
      name: "test user",
      username: "testusername",
      password: "secretpassword",
    });
    console.log("create", user);
    expectSafeUser(user);
  });
});

describe("getAll()", () => {
  test("returns all users", async () => {
    await createTestUser();
    await createTestSpecificUser("username2");
    const userList = await getAll();
    expect(userList).toHaveLength(2);
  });

  test("no users returns empty array", async () => {
    const userList = await getAll();
    expect(userList).toHaveLength(0);
  });
});

describe("getOneById()", () => {
  test("returns user", async () => {
    await createTestUser();
    const { id } = await createTestSpecificUser("username2");
    const user = await getOneById(id);
    expect(user.username).toBe("username2");
  });

  test("no id match returns expected message", async () => {
    const { id } = await createTestUser();
    try {
      await getOneById(id + 1);
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("no matching user id found");
    }
  });
});

describe("getOneByName()", () => {
  test("returns user", async () => {
    await createTestUser();
    const { username } = await createTestSpecificUser("username2");
    const userList = await getOneByUsername(username);
    expect(userList.username).toBe(username);
  });

  test("no name match returns expected message", async () => {
    await createTestUser();
    try {
      await getOneByUsername("username2");
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("no matching username found");
    }
  });
});

describe("create()", () => {
  test("creates user", async () => {
    await create({
      name: "test user",
      username: "testusername",
      password: "secretpassword",
    });
    expect(await User.count()).toBe(1);
  });

  test("empty username returns expected error message", async () => {
    try {
      await create({
        name: "test user",
        username: "",
        password: "secretpassword",
      });
    } catch (error) {
      error instanceof Error &&
        expect(error.message).toBe("Validation error: username must be between 5 and 30 characters");
    }
  });

  test("empty name returns expected message", async () => {
    try {
      await create({
        name: "t",
        username: "testusername",
        password: "secretpassword",
      });
    } catch (error) {
      error instanceof Error &&
        expect(error.message).toBe("Validation error: name must be between 3 and 30 characters");
    }
  });

  test("empty password returns expected message", async () => {
    try {
      await create({
        name: "test user",
        username: "testusername",
        password: "nope",
      });
    } catch (error) {
      error instanceof Error &&
        expect(error.message).toBe("Validation error: password must be 9 to 20 characters long");
    }
  });

  test("username not unique returns expected message", async () => {
    await createTestUser();

    try {
      await create({
        name: "test user",
        username: "testusername",
        password: "secretpassword",
      });
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("Validation error: username must be unique");
    }
  });
});

afterAll(async () => await sequelize.close());
