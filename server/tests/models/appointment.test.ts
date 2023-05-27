import { Specialist, Appointment, Patient } from "../../models";
import { createTestPatientAndSpecialist, dropAllTables } from "../helpers";
import { sequelize } from "../../utils/connectToDb";

beforeEach(async () => await dropAllTables());

test("complete appointment instance is returned with autogenerated primary key", async () => {
  const { specialistId, patientId } = await createTestPatientAndSpecialist();
  const appointment = await Appointment.create({
    date: "2020-02-02",
    start: "09:00:00",
    end: "10:00:00",
    type: "intake",
    description: "Appointment description",
    specialistId,
    patientId,
  });

  expect(appointment).toHaveProperty("appointmentId");
  expect(appointment).toHaveProperty("date");
  expect(appointment).toHaveProperty("start");
  expect(appointment).toHaveProperty("end");
  expect(appointment).toHaveProperty("type");
  expect(appointment).toHaveProperty("description");
  expect(appointment).toHaveProperty("patientId");
  expect(appointment).toHaveProperty("specialistId");

  expect(appointment.appointmentId).toEqual(1);
});

describe("model validators", () => {
  test("date cannot be empty string", async () => {
    const { specialistId, patientId } = await createTestPatientAndSpecialist();
    await expect(
      Appointment.create({
        date: "",
        start: "09:00:00",
        end: "10:00:00",
        type: "intake",
        description: "Appointment description",
        specialistId,
        patientId,
      })
    ).rejects.toThrowError("Validation error: Validation notEmpty on date failed");
  });

  test("date must be a valid date", async () => {
    const { specialistId, patientId } = await createTestPatientAndSpecialist();
    await expect(
      Appointment.create({
        date: "invalid-date",
        start: "09:00:00",
        end: "10:00:00",
        type: "intake",
        description: "Appointment description",
        specialistId,
        patientId,
      })
    ).rejects.toThrowError("Validation error: Validation isDate on date failed");
  });

  test("start cannot be empty string", async () => {
    const { specialistId, patientId } = await createTestPatientAndSpecialist();
    await expect(
      Appointment.create({
        date: "2023-05-26",
        start: "",
        end: "10:00:00",
        type: "intake",
        description: "Appointment description",
        specialistId,
        patientId,
      })
    ).rejects.toThrowError("Validation error: Validation notEmpty on start failed");
  });

  test("start must be in the format HH:MM:SS", async () => {
    const { specialistId, patientId } = await createTestPatientAndSpecialist();
    await expect(
      Appointment.create({
        date: "2023-05-26",
        start: "1:00:00",
        end: "10:00:00",
        type: "intake",
        description: "Appointment description",
        specialistId,
        patientId,
      })
    ).rejects.toThrowError("Validation error: Validation is on start failed");
  });

  test("end cannot be empty string", async () => {
    const { specialistId, patientId } = await createTestPatientAndSpecialist();
    await expect(
      Appointment.create({
        date: "2023-05-26",
        start: "09:00:00",
        end: "",
        type: "intake",
        description: "Appointment description",
        specialistId,
        patientId,
      })
    ).rejects.toThrowError("Validation error: Validation notEmpty on end failed");
  });

  test("end must be in the format HH:MM:SS", async () => {
    const { specialistId, patientId } = await createTestPatientAndSpecialist();
    await expect(
      Appointment.create({
        date: "2023-05-26",
        start: "09:00:00",
        end: "1:00:00",
        type: "intake",
        description: "Appointment description",
        specialistId,
        patientId,
      })
    ).rejects.toThrowError("Validation error: Validation is on end failed");
  });

  test("type cannot be empty string", async () => {
    const { specialistId, patientId } = await createTestPatientAndSpecialist();
    await expect(
      Appointment.create({
        date: "2023-05-26",
        start: "09:00:00",
        end: "10:00:00",
        type: "",
        description: "Appointment description",
        specialistId,
        patientId,
      })
    ).rejects.toThrowError("Validation error: Validation notEmpty on type failed");
  });

  test("description cannot be empty string", async () => {
    const { specialistId, patientId } = await createTestPatientAndSpecialist();
    await expect(
      Appointment.create({
        date: "2023-05-26",
        start: "09:00:00",
        end: "10:00:00",
        type: "intake",
        description: "",
        specialistId,
        patientId,
      })
    ).rejects.toThrowError("Validation error: Validation notEmpty on description failed");
  });
});

describe("foreign key association tests", () => {
  test("appointment cannot be created with invalid patient fkey", async () => {
    const { specialistId } = await createTestPatientAndSpecialist();
    await expect(
      Appointment.create({
        date: "2023-05-26",
        start: "09:00:00",
        end: "10:00:00",
        type: "intake",
        description: "Appointment description",
        specialistId,
        patientId: 2,
      })
    ).rejects.toThrowError(
      'insert or update on table "appointments" violates foreign key constraint "appointments_patient_id_fkey"'
    );
    expect(await Appointment.count()).toBe(0);
    expect(await Specialist.count()).toBe(1);
    expect(await Patient.count()).toBe(1);
  });

  test("appointment cannot be created with invalid specialist fkey", async () => {
    const { patientId } = await createTestPatientAndSpecialist();
    await expect(
      Appointment.create({
        date: "2023-05-26",
        start: "09:00:00",
        end: "10:00:00",
        type: "intake",
        description: "Appointment description",
        specialistId: 2,
        patientId,
      })
    ).rejects.toThrowError(
      'insert or update on table "appointments" violates foreign key constraint "appointments_specialist_id_fkey"'
    );

    expect(await Appointment.count()).toBe(0);
    expect(await Specialist.count()).toBe(1);
    expect(await Patient.count()).toBe(1);
  });

  test("appointment can be deleted without violating fkey constraints", async () => {
    const { patientId, specialistId } = await createTestPatientAndSpecialist();
    const appointment = await Appointment.create({
      date: "2023-05-26",
      start: "09:00:00",
      end: "10:00:00",
      type: "intake",
      description: "Appointment description",
      specialistId,
      patientId,
    });
    expect(await Appointment.count()).toBe(1);
    expect(await Specialist.count()).toBe(1);
    expect(await Patient.count()).toBe(1);
    await appointment.destroy();
    expect(await Appointment.count()).toBe(0);
    expect(await Specialist.count()).toBe(1);
    expect(await Patient.count()).toBe(1);
  });
});

afterAll(async () => await sequelize.close());
