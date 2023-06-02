/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { sequelize } from "../../utils/connectToDb";
import { Patient } from "../../models";
import supertest from "supertest";
import app from "../../app";
import { createTestPatientAndSpecialist, createTestSpecialist, dropAllTables } from "../helpers/models";
import { expectPatient, expectPatientDetail } from "../helpers/shape";

const api = supertest(app);

beforeEach(async () => await dropAllTables());

describe("/api/patients", () => {
  describe("get", () => {
    test("patients are returned as json", async () => {
      await api
        .get("/api/patients")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });
  });
  describe("post", () => {
    test("patient is posted", async () => {
      const { specialistId } = await createTestSpecialist();
      const { body } = await api.post("/api/patients").send({
        name: "test patient",
        email: "test@email.com",
        phone: "1234567891",
        dateOfBirth: "2020-02-02",
        gender: "male",
        address: "123 street city state",
        specialistId: specialistId,
      });

      expectPatient(body);
      expect(await Patient.count()).toBe(1);
    });

    test("invalid properties return expected error message", async () => {
      const { specialistId } = await createTestSpecialist();
      const response = await api.post("/api/patients").send({
        invalid: "invalid",
        name: "test patient",
        email: "test@email.com",
        phone: "1234567891",
        dateOfBirth: "2020-02-02",
        gender: "male",
        address: "123 street city state",
        specialistId: specialistId,
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Error posting patient: Error: invalid property on patient input");
      expect(await Patient.count()).toBe(0);
    });

    test("invalid values return expected error message", async () => {
      const { specialistId } = await createTestSpecialist();
      const response = await api.post("/api/patients").send({
        name: 1234,
        email: "test@email.com",
        phone: "1234567891",
        dateOfBirth: "2020-02-02",
        gender: "male",
        address: "123 street city state",
        specialistId: specialistId,
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Error posting patient: Error: malformed or invalid value on patient input");
      expect(await Patient.count()).toBe(0);
    });

    test("missing properties return expected error message", async () => {
      await createTestSpecialist();
      const response = await api.post("/api/patients").send({
        email: "test@email.com",
        phone: "1234567891",
        dateOfBirth: "2020-02-02",
        gender: "male",
        address: "123 street city state",
        specialistId: 1,
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Error posting patient: Error: malformed or invalid value on patient input");
      expect(await Patient.count()).toBe(0);
    });

    test("overriding id return expected error message", async () => {
      await createTestSpecialist();
      const response = await api.post("/api/patients").send({
        name: "test patient",
        email: "test@email.com",
        phone: "1234567891",
        dateOfBirth: "2020-02-02",
        gender: "male",
        address: "123 street city state",
        specialistId: 1,
        patientId: 2,
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Error posting patient: Error: invalid property on patient input");
      expect(await Patient.count()).toBe(0);
    });
  });
});

describe("/api/patients/:id", () => {
  describe("get", () => {
    test("patient is returned by id", async () => {
      const { patientId } = await createTestPatientAndSpecialist();
      const { body } = await api.get(`/api/patients/${patientId}`);

      expectPatientDetail(body);
    });

    test("no id match returns expected error message", async () => {
      const response = await api.get("/api/patients/2");
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Error getting patient: Error: no matching patient id found");
    });
  });
  describe("put", () => {
    test("patient is updated by id", async () => {
      const { patientId } = await createTestPatientAndSpecialist();
      const response = await api.put(`/api/patients/${patientId}`).send({ name: "updated name" });
      expectPatientDetail(response.body);
      expect(response.body.name).toBe("updated name");
    });

    test("no id match returns expected message", async () => {
      const response = await api.put("/api/patients/2").send({ name: "updated name" });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Error updating patient: Error: no matching patient id found");
    });

    test("invalid properties return expected message", async () => {
      const { patientId } = await createTestPatientAndSpecialist();
      const response = await api.put(`/api/patients/${patientId}`).send({ invalid: "invalid property name" });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Error updating patient: Error: invalid property on patient input");
    });

    test("invalid values return expected message", async () => {
      const { patientId } = await createTestPatientAndSpecialist();
      const response = await api.put(`/api/patients/${patientId}`).send({ name: 1234 });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Error updating patient: Error: malformed or invalid value on patient");
    });
  });
  describe("delete", () => {
    //
    test("patient is deleted by id", async () => {
      const { patientId } = await createTestPatientAndSpecialist();
      expect(await Patient.count()).toBe(1);
      const response = await api.delete(`/api/patients/${patientId}`);
      expect(response.status).toBe(204);
      expect(await Patient.count()).toBe(0);
    });

    test("no id match returns expected message", async () => {
      await createTestPatientAndSpecialist();
      expect(await Patient.count()).toBe(1);
      const response = await api.delete(`/api/patients/2`);
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Error deleting patient: Error: no matching patient id found");
      expect(await Patient.count()).toBe(1);
    });
  });
});

afterAll(async () => await sequelize.close());
