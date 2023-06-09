/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { sequelize } from "../../utils/connectToDb";
import supertest from "supertest";
import app from "../../app";

import { expectDangerousUser, expectSafeUser } from "../helpers/shape";
import { createTestUser, dropUserTable } from "../helpers/models";
import { User } from "../../models";

const api = supertest(app);

beforeEach(async () => await dropUserTable());

describe("/api/users", () => {
  describe("get", () => {
    test("users are returned as json", async () => {
      await api
        .get("/api/users")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });
  });

  describe("post", () => {
    test("user is posted", async () => {
      const { body } = await api.post("/api/users").send({
        name: "test user",
        username: "testusername",
        password: "secretpassword",
      });
      expectSafeUser(body);
      const user = await User.findByPk(body.id);
      if (user) expectDangerousUser(user);
      else throw new Error();
    });

    test("password is not returned to client after creation", async () => {
      const { body } = await api.post("/api/users").send({
        name: "test user",
        username: "testusername",
        password: "secretpassword",
      });
      expectSafeUser(body);
    });

    test("invalid properties return expected error message", async () => {
      const response = await api.post("/api/users").send({
        name: "test user",
        username: "testusername",
        password: "secretpassword",
        invalid: "invalid property",
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Error creating user: Error: invalid property on user input");
      expect(await User.count()).toBe(0);
    });

    test("non-unqiue username returns expected error message", async () => {
      await createTestUser();
      const response = await api.post("/api/users").send({
        name: "test user",
        username: "testusername",
        password: "secretpassword",
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "Error creating user: SequelizeUniqueConstraintError: Validation error: username must be unique"
      );
      expect(await User.count()).toBe(1);
    });

    test("invalid name returns expected error message", async () => {
      const response = await api.post("/api/users").send({
        name: "t",
        username: "testusername",
        password: "secretpassword",
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "Error creating user: SequelizeValidationError: Validation error: name must be between 3 and 30 characters"
      );
      expect(await User.count()).toBe(0);
    });

    test("invalid username returns expected error message", async () => {
      const response = await api.post("/api/users").send({
        name: "test user",
        username: "t",
        password: "secretpassword",
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "Error creating user: SequelizeValidationError: Validation error: username must be between 5 and 30 characters"
      );
      expect(await User.count()).toBe(0);
    });

    test("invalid password returns expected error message", async () => {
      const response = await api.post("/api/users").send({
        name: "test user",
        username: "testusername",
        password: "n",
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        "Error creating user: Error: Validation error: password must be 9 to 20 characters long"
      );
      expect(await User.count()).toBe(0);
    });
  });
});

describe("/api/users/:id", () => {
  describe("get", () => {
    test("user is returned by id", async () => {
      const { id } = await createTestUser();
      const response = await api.get(`/api/users/${id}`);
      if (response.body) expectDangerousUser(response.body);
    });

    test("no id match returns expected message", async () => {
      const response = await api.get(`/api/users/2`);
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Error getting user: Error: no matching user id found");
    });
  });
});

afterAll(async () => await sequelize.close());
