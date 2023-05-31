/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
// we pass and assign unsafe values and allow expect to test
import { sequelize } from "../../utils/connectToDb";
import supertest from "supertest";
import app from "../../app";
import { dropAllTables } from "../helpers/models";
import { expectSpecialistInformation } from "../helpers/shape";
import { Specialist } from "../../models";
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
      const response = await api.post("/api/specialists").send({ name: "test specialist", speciality: "testing" });
      expectSpecialistInformation(response.body);
      expect(await Specialist.count()).toBe(1);
    });

    test("invalid properties return expected error message", async () => {
      const response = await api
        .post("/api/specialists")
        .send({ invalid: "invalid", name: "test specialist", speciality: "testing" });

      expect(response.status).toBe(400);
      const responseBody = JSON.parse(response.text);
      expect(responseBody.error).toBe("Error creating specialists: Error: invalid property on specialist input");
      expect(await Specialist.count()).toBe(0);
    });

    test("invalid values return expected error message", async () => {
      const response = await api.post("/api/specialists").send({ name: 12345, speciality: "testing" });

      expect(response.status).toBe(400);
      const responseBody = JSON.parse(response.text);
      expect(responseBody.error).toBe(
        "Error creating specialists: Error: malformed or invalid value on specialist input"
      );
      expect(await Specialist.count()).toBe(0);
    });

    test("missing properties return expected error message", async () => {
      const response = await api.post("/api/specialists").send({ speciality: "testing" });

      expect(response.status).toBe(400);
      const responseBody = JSON.parse(response.text);
      expect(responseBody.error).toBe(
        "Error creating specialists: Error: malformed or invalid value on specialist input"
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
        "Error creating specialists: Error: malformed or invalid value on specialist input"
      );
      expect(await Specialist.count()).toBe(0);
    });
  });
});

describe("/api/specialists/:id", () => {
  describe("get", () => {
    //
  });
  describe("put", () => {
    //
  });
  describe("delete", () => {
    //
  });
});

afterAll(async () => await sequelize.close());
