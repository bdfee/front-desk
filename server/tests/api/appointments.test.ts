/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { sequelize } from "../../utils/connectToDb";
import { Appointment } from "../../models";
import supertest from "supertest";
import app from "../../app";
import { createTestPatientAndSpecialist, createTestSPA, dropAllTables } from "../helpers/models";
import { expectAppointment, expectAppointmentDetail } from "../helpers/shape";

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
    test("appointment is posted", async () => {
      const { patientId, specialistId } = await createTestPatientAndSpecialist();
      const { body } = await api.post("/api/appointments").send({
        date: "2020-02-02",
        start: "09:00:00",
        end: "10:00:00",
        type: "intake",
        description: "Appointment description",
        specialistId,
        patientId,
      });
      expectAppointment(body);
      expect(await Appointment.count()).toBe(1);
    });

    test("invalid properties return expected error message", async () => {
      const { specialistId, patientId } = await createTestPatientAndSpecialist();
      const response = await api.post("/api/appointments").send({
        invalid: "invalid property",
        date: "2020-02-02",
        start: "09:00:00",
        end: "10:00:00",
        type: "intake",
        description: "Appointment description",
        specialistId,
        patientId,
      });

      expect(response.status).toBe(400);
      const responseBody = JSON.parse(response.text);
      expect(responseBody.error).toBe("Error posting appointment: Error: invalid property on appointment input");
      expect(await Appointment.count()).toBe(0);
    });

    test("invalid values return expected error message", async () => {
      const { specialistId, patientId } = await createTestPatientAndSpecialist();
      const response = await api.post("/api/appointments").send({
        date: "2020-02-02",
        start: 9,
        end: "10:00:00",
        type: "intake",
        description: "Appointment description",
        specialistId,
        patientId,
      });

      expect(response.status).toBe(400);
      const responseBody = JSON.parse(response.text);
      expect(responseBody.error).toBe(
        "Error posting appointment: Error: malformed or invalid value on appointment input"
      );
      expect(await Appointment.count()).toBe(0);
    });

    test("missing properties return expected error message", async () => {
      const { specialistId, patientId } = await createTestPatientAndSpecialist();
      const response = await api.post("/api/appointments").send({
        date: "2020-02-02",
        end: "10:00:00",
        type: "intake",
        description: "Appointment description",
        specialistId,
        patientId,
      });

      expect(response.status).toBe(400);
      const responseBody = JSON.parse(response.text);
      expect(responseBody.error).toBe(
        "Error posting appointment: Error: malformed or invalid value on appointment input"
      );
      expect(await Appointment.count()).toBe(0);
    });

    test("overriding id return expected error message", async () => {
      const { specialistId, patientId } = await createTestPatientAndSpecialist();
      const response = await api.post("/api/appointments").send({
        date: "2020-02-02",
        start: "09:00:00",
        end: "10:00:00",
        type: "intake",
        description: "Appointment description",
        specialistId,
        patientId,
        appointmentId: 2,
      });

      expect(response.status).toBe(400);
      const responseBody = JSON.parse(response.text);
      expect(responseBody.error).toBe("Error posting appointment: Error: invalid property on appointment input");
      expect(await Appointment.count()).toBe(0);
    });
  });
});

describe("/api/appointments/:id", () => {
  describe("get", () => {
    test("appointments is returned by id", async () => {
      const { appointmentId } = await createTestSPA();
      const { body } = await api.get(`/api/appointments/${appointmentId}`);
      expectAppointmentDetail(body);
    });

    test("no id match returns expected error message", async () => {
      const response = await api.get("/api/appointments/2");
      expect(response.status).toBe(400);
      const responseBody = JSON.parse(response.text);
      expect(responseBody.error).toBe("Error getting appointment: Error: no matching appointment id found");
    });
  });
  describe("put", () => {
    //
    test("appointments is updated by id", async () => {
      const { appointmentId } = await createTestSPA();
      const response = await api.put(`/api/appointments/${appointmentId}`).send({ date: "2020-03-03" });
      expectAppointmentDetail(response.body);
      expect(response.body.date).toBe("2020-03-03");
    });

    test("no id match returns expected message", async () => {
      const response = await api.put("/api/appointments/2").send({ date: "2020-03-03" });
      expect(response.status).toBe(400);
      const responseBody = JSON.parse(response.text);
      expect(responseBody.error).toBe("Error updating appointment: Error: no matching appointment id found");
    });

    test("invalid properties return expected message", async () => {
      const { appointmentId } = await createTestSPA();
      const response = await api.put(`/api/appointments/${appointmentId}`).send({ invalid: "invalid property name" });
      expect(response.status).toBe(400);
      const responseBody = JSON.parse(response.text);
      expect(responseBody.error).toBe("Error updating appointment: Error: invalid property");
    });

    test("invalid values return expected message", async () => {
      const { appointmentId } = await createTestSPA();
      const response = await api.put(`/api/appointments/${appointmentId}`).send({ date: 1234 });
      expect(response.status).toBe(400);
      const responseBody = JSON.parse(response.text);
      expect(responseBody.error).toBe("Error updating appointment: Error: malformed or invalid value on appointment");
    });
  });
  describe("delete", () => {
    //
    test("appointments is deleted by id", async () => {
      const { appointmentId } = await createTestSPA();
      expect(await Appointment.count()).toBe(1);
      const response = await api.delete(`/api/appointments/${appointmentId}`);
      expect(response.status).toBe(204);
      expect(await Appointment.count()).toBe(0);
    });

    test("no id match returns expected message", async () => {
      await createTestSPA();
      expect(await Appointment.count()).toBe(1);
      const response = await api.delete(`/api/appointments/2`);
      expect(response.status).toBe(400);
      const responseBody = JSON.parse(response.text);
      expect(responseBody.error).toBe("Error deleting appointment: Error: no matching appointment id found");
      expect(await Appointment.count()).toBe(1);
    });
  });
});

afterAll(async () => await sequelize.close());
