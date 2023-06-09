/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { sequelize } from "../../utils/connectToDb";
import supertest from "supertest";
import app from "../../app";

import { expectAuthenticatedUser } from "../helpers/shape";
import { createTestUser, dropUserTable } from "../helpers/models";

const api = supertest(app);

beforeEach(async () => await dropUserTable());

describe("/api/login", () => {
  describe("post", () => {
    test("users can login", async () => {
      await createTestUser();
      await api
        .post("/api/login")
        .send({
          username: "testusername",
          password: "secretpassword",
        })
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    test("AuthenticatedUser is returned to the client", async () => {
      await createTestUser();
      const { body } = await api.post("/api/login").send({
        username: "testusername",
        password: "secretpassword",
      });
      expectAuthenticatedUser(body);
    });

    test("invalid username returns expected error message", async () => {
      await createTestUser();
      const response = await api.post("/api/login").send({
        username: "wrong",
        password: "secretpassword",
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Error logging in: Error: Error logging in: no matching username found");
    });

    test("invalid password returns expected error message", async () => {
      await createTestUser();
      const response = await api.post("/api/login").send({
        username: "testusername",
        password: "wrong",
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Error logging in: Error: Error logging in: invalid username or password");
    });
  });
});

afterAll(async () => await sequelize.close());
