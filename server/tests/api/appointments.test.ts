/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { sequelize } from "../../utils/connectToDb";
import supertest from "supertest";
import app from "../../app";
import { dropAllTables } from "../helpers/models";

const api = supertest(app);

beforeEach(async () => await dropAllTables());

describe("/api/appointments", () => {
  describe("get", () => {
    test("patients are returned as json", async () => {
      await api
        .get("/api/appointments")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });
  });
  describe("post", () => {
    test("appointments is posted", async () => {
      //
    });

    test("invalid properties return expected error message", async () => {
      //
    });

    test("invalid values return expected error message", async () => {
      //
    });

    test("missing properties return expected error message", async () => {
      //
    });

    test("overriding id return expected error message", async () => {
      //
    });
  });
});

describe("/api/appointments/:id", () => {
  describe("get", () => {
    test("appointments is returned by id", async () => {
      //
    });

    test("no id match returns expected error message", async () => {
      //
    });
  });
  describe("put", () => {
    //
    test("appointments is updated by id", async () => {
      //
    });

    test("no id match returns expected message", async () => {
      //
    });

    test("invalid properties return expected message", async () => {
      //
    });
  });
  describe("delete", () => {
    //
    test("appointments is deleted by id", async () => {
      //
    });

    test("no id match returns expected message", async () => {
      //
    });
  });
});

afterAll(async () => await sequelize.close());
