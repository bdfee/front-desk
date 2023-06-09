/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { sequelize } from "../../utils/connectToDb";
import { User } from "../../models";
import { dropUserTable, createTestUser } from "../helpers/models";
import { expectDangerousUser } from "../helpers/shape";

beforeEach(async () => await dropUserTable());

test("user details are stored in db", async () => {
  expectDangerousUser(await createTestUser());
});

describe("model validators", () => {
  describe("username", () => {
    test("username cannot be empty", async () => {
      await expect(
        User.create({
          name: "test user",
          username: "",
          password: "secretpassword",
        })
      ).rejects.toThrowError("Validation error: username must be between 5 and 30 characters");
    });

    test("username must be between 5 and 30 characters", async () => {
      await expect(
        User.create({
          name: "test user",
          username: "1234",
          password: "secretpassword",
        })
      ).rejects.toThrowError("Validation error: username must be between 5 and 30 characters");
      await expect(
        User.create({
          name: "test user",
          username: "123456789293847564738291029384a",
          password: "secretpassword",
        })
      ).rejects.toThrowError("Validation error: username must be between 5 and 30 characters");
    });

    test("username must be unique", async () => {
      await createTestUser();
      await expect(
        User.create({
          name: "test user",
          username: "testusername",
          password: "secretpassword",
        })
      ).rejects.toThrowError("Validation error: username must be unique");
    });

    test("username must contain no spaces", async () => {
      await createTestUser();
      await expect(
        User.create({
          name: "test user",
          username: "test username",
          password: "secretpassword",
        })
      ).rejects.toThrowError("Validation error: username cannot contain spaces");
    });
  });
  describe("name", () => {
    test("name cannot be empty", async () => {
      await expect(
        User.create({
          name: "",
          username: "testusername",
          password: "secretpassword",
        })
      ).rejects.toThrowError("Validation error: name must be between 3 and 30 characters");
    });
    test("name must be between 3 and 30 characters", async () => {
      await expect(
        User.create({
          name: "12",
          username: "testusername",
          password: "secretpassword",
        })
      ).rejects.toThrowError("Validation error: name must be between 3 and 30 characters");
      await expect(
        User.create({
          name: "123456345624536425436524536415267385",
          username: "testusername",
          password: "secretpassword",
        })
      ).rejects.toThrowError("Validation error: name must be between 3 and 30 characters");
    });
  });

  describe("password", () => {
    test("password cannot be empty", async () => {
      await expect(
        User.create({
          name: "test user",
          username: "testusername",
          password: "",
        })
      ).rejects.toThrowError("Validation error: password must be 9 to 20 characters long");
    });

    test("password cannot less than 9 or greater than 20 chars", async () => {
      await expect(
        User.create({
          name: "test user",
          username: "testusername",
          password: "12345678",
        })
      ).rejects.toThrowError("Validation error: password must be 9 to 20 characters long");

      await expect(
        User.create({
          name: "test user",
          username: "testusername",
          password: "245624562456245624562",
        })
      ).rejects.toThrowError("Validation error: password must be 9 to 20 characters long");
    });
  });
});

afterAll(async () => await sequelize.close());
