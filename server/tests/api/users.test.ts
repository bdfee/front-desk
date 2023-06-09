/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { sequelize } from "../../utils/connectToDb";
import supertest from "supertest";
import app from "../../app";

import { expectSafeUser } from "../helpers/shape";
import { dropUserTable } from "../helpers/models";

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
      console.log(body);
      expectSafeUser(body);
    });

    test("password is not returned to client after creation", async () => {
      //
    });

    test("invalid properties return expected error message", async () => {
      //
    });

    test("invalid values return expected error message", async () => {
      //
    });

    test("non-unqiue username returns expected error message", async () => {
      //
    });

    test("invalid password returns expected error message", async () => {
      //
    });
  });
});

describe("/api/users/:id", () => {
  describe("get", () => {
    test("user is returned by id", async () => {
      //
    });

    test("no id match returns expected message", async () => {
      //
    });
  });
});

afterAll(async () => await sequelize.close());
