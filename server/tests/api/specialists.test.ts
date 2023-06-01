/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { sequelize } from "../../utils/connectToDb";
import { Specialist } from "../../models";
import supertest from "supertest";
import app from "../../app";
import { createTestSpecialist, dropAllTables } from "../helpers/models";
import { expectSpecialist } from "../helpers/shape";

const api = supertest(app);

beforeEach(async () => await dropAllTables());

describe("/api/specialists", () => {
  describe("get", () => {
    test("specialist are returned as json", async () => {
      await api
        .get("/api/specialists")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });
  });

  describe("post", () => {
    test("specialist is posted", async () => {
      const { body } = await api.post("/api/specialists").send({ name: "test specialist", speciality: "testing" });
      expectSpecialist(body);
      expect(await Specialist.count()).toBe(1);
    });

    test("invalid properties return expected error message", async () => {
      const response = await api
        .post("/api/specialists")
        .send({ invalid: "invalid", name: "test specialist", speciality: "testing" });

      expect(response.status).toBe(400);
      const responseBody = JSON.parse(response.text);
      expect(responseBody.error).toBe("Error posting specialists: Error: invalid property on specialist input");
      expect(await Specialist.count()).toBe(0);
    });

    test("invalid values return expected error message", async () => {
      const response = await api.post("/api/specialists").send({ name: 12345, speciality: "testing" });

      expect(response.status).toBe(400);
      const responseBody = JSON.parse(response.text);
      expect(responseBody.error).toBe(
        "Error posting specialists: Error: malformed or invalid value on specialist input"
      );
      expect(await Specialist.count()).toBe(0);
    });

    test("missing properties return expected error message", async () => {
      const response = await api.post("/api/specialists").send({ speciality: "testing" });

      expect(response.status).toBe(400);
      const responseBody = JSON.parse(response.text);
      expect(responseBody.error).toBe(
        "Error posting specialists: Error: malformed or invalid value on specialist input"
      );
      expect(await Specialist.count()).toBe(0);
    });

    test("overriding id return expected error message", async () => {
      const response = await api
        .post("/api/specialists")
        .send({ name: "testing", speciality: "testing", specialistId: 2 });

      expect(response.status).toBe(400);
      const responseBody = JSON.parse(response.text);
      expect(responseBody.error).toBe(
        "Error posting specialists: Error: malformed or invalid value on specialist input"
      );
      expect(await Specialist.count()).toBe(0);
    });
  });
});

describe("/api/specialists/:id", () => {
  describe("get", () => {
    test("specialist is returned by ID", async () => {
      const specialist = await createTestSpecialist();
      const response = await api.get(`/api/specialists/${specialist.specialistId}`);

      expectSpecialist(response.body);
    });

    test("no id match returns expected message", async () => {
      const response = await api.get("/api/specialists/2");
      expect(response.status).toBe(400);
      const responseBody = JSON.parse(response.text);
      expect(responseBody.error).toBe("Error getting specialist: Error: no matching specialist id found");
    });
  });
  describe("put", () => {
    test("specialist is updated by id", async () => {
      const { specialistId } = await createTestSpecialist();
      const response = await api.put(`/api/specialists/${specialistId}`).send({ name: "updated name" });
      expectSpecialist(response.body);
      expect(response.body.name).toBe("updated name");
    });

    test("no id match returns expected message", async () => {
      const response = await api.put("/api/specialists/2").send({ name: "updated name" });
      expect(response.status).toBe(400);
      const responseBody = JSON.parse(response.text);
      expect(responseBody.error).toBe("Error updating specialist: Error: no matching specialist id found");
    });

    test("invalid properties return expected message", async () => {
      const { specialistId } = await createTestSpecialist();
      const response = await api.put(`/api/specialists/${specialistId}`).send({ invalid: "invalid property name" });
      expect(response.status).toBe(400);
      const responseBody = JSON.parse(response.text);
      expect(responseBody.error).toBe("Error updating specialist: Error: invalid property");
    });

    test("invalid values return expected message", async () => {
      const { specialistId } = await createTestSpecialist();
      const response = await api.put(`/api/specialists/${specialistId}`).send({ name: 1234 });
      expect(response.status).toBe(400);
      const responseBody = JSON.parse(response.text);
      expect(responseBody.error).toBe("Error updating specialist: Error: malformed or invalid value on specialist");
    });
  });
  describe("delete", () => {
    test("specialist is deleted by id", async () => {
      const { specialistId } = await createTestSpecialist();
      expect(await Specialist.count()).toBe(1);
      const response = await api.delete(`/api/specialists/${specialistId}`);
      expect(response.status).toBe(204);
      expect(await Specialist.count()).toBe(0);
    });

    test("no id match returns expected message", async () => {
      await createTestSpecialist();
      expect(await Specialist.count()).toBe(1);
      const response = await api.delete(`/api/specialists/2`);

      expect(response.status).toBe(400);

      expect(await Specialist.count()).toBe(1);
    });
  });
});

afterAll(async () => await sequelize.close());
