import { Patient } from "../../models";
import { sequelize } from "../../utils/connectToDb";
import { createTestPatientAndSpecialist, createTestSpecialist, dropAllTables } from "../helpers/models";
import { expectPatientInformation, expectPatient } from "../helpers/shape";
import { PatientInformationAttributes, PatientAttributes } from "../../types";

import { getAll, deleteOneById, updateOneById, getOneById, create } from "../../services/patient";

beforeEach(async () => await dropAllTables());
// we assert to run the expect tests instead of typing the input
describe("returned shape", () => {
  test("getAll()", async () => {
    await createTestPatientAndSpecialist();
    const [patient] = await getAll();

    expectPatientInformation(patient as PatientInformationAttributes);
  });

  test("getOneById()", async () => {
    await createTestPatientAndSpecialist();

    expectPatientInformation((await getOneById(1)) as PatientInformationAttributes);
  });

  test("create()", async () => {
    await createTestSpecialist();

    expectPatient(
      (await create({
        name: "test patient",
        email: "test@test.com",
        phone: "1234567890",
        dateOfBirth: "2020-02-02",
        gender: "male",
        address: "123 street city state",
        specialistId: 1,
      })) as PatientAttributes
    );
  });

  test("updateOneById() patient", async () => {
    const { patientId } = await createTestPatientAndSpecialist();
    const update = { name: "update name" };

    expectPatientInformation((await updateOneById(patientId, update)) as PatientInformationAttributes);
  });
});

describe("create()", () => {
  test("creates patient", async () => {
    await createTestSpecialist();

    expect(await Patient.count()).toBe(0);
    await create({
      name: "test patient",
      email: "test@test.com",
      phone: "1234567890",
      dateOfBirth: "2020-02-02",
      gender: "male",
      address: "123 street city state",
      specialistId: 1,
    });
    expect(await Patient.count()).toBe(1);
  });

  test("no creation returns expected message", async () => {
    expect(await Patient.count()).toBe(0);
    try {
      await create({
        name: "test patient",
        phone: "1234567890",
        dateOfBirth: "2020-02-02",
        gender: "male",
        address: "123 street city state",
        specialistId: 1,
      });
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("Malformed or missing patient input");
    }
    expect(await Patient.count()).toBe(0);
  });
});

describe("getAll()", () => {
  test("returns all patients", async () => {
    await createTestPatientAndSpecialist();
    await createTestPatientAndSpecialist();
    await createTestPatientAndSpecialist();

    expect(await Patient.count()).toBe(3);
    expect(await getAll()).toHaveLength(3);
  });

  test("no patients returns empty array", async () => {
    expect(await Patient.count()).toBe(0);
    expect(await getAll()).toHaveLength(0);
  });
});

describe("getOneById()", () => {
  test("returns patient by id", async () => {
    await createTestPatientAndSpecialist();
    const patient = await getOneById(1);
    expect(await Patient.count()).toBe(1);
    expect(patient?.patientId).toBe(1);
  });

  test("no id match returns expected error message", async () => {
    await createTestPatientAndSpecialist();
    expect(await Patient.count()).toBe(1);

    try {
      await getOneById(2);
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("No matching patient id found");
    }

    expect(await Patient.count()).toBe(1);
  });
});

describe("deleteOneById()", () => {
  test("deletes patient by ID", async () => {
    const { patientId } = await createTestPatientAndSpecialist();
    await createTestPatientAndSpecialist();

    expect(await Patient.count()).toBe(2);
    await deleteOneById(patientId);

    expect(await Patient.count()).toBe(1);
  });

  test("no id match returns expected error message", async () => {
    await createTestPatientAndSpecialist();
    expect(await Patient.count()).toBe(1);

    try {
      await deleteOneById(2);
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("No matching patient id found");
    }

    expect(await Patient.count()).toBe(1);
  });
});

describe("updateOneById", () => {
  test("updates one patient by id", async () => {
    const { patientId } = await createTestPatientAndSpecialist();
    await updateOneById(patientId, { name: "update name" });

    expect(await Patient.count()).toBe(1);

    const updatedPatient = await Patient.findByPk(patientId);

    expect(updatedPatient?.name).toEqual("update name");
    expect(await Patient.count()).toBe(1);
  });

  test("no id match returns expected error message", async () => {
    await createTestPatientAndSpecialist();
    expect(await Patient.count()).toBe(1);

    try {
      await updateOneById(2, { name: "update name" });
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("No matching patient id found");
    }

    expect(await Patient.count()).toBe(1);
  });

  test("invalid property returns expected error message", async () => {
    await createTestPatientAndSpecialist();
    expect(await Patient.count()).toBe(1);

    try {
      await updateOneById(1, { invalid: "invalid update" });
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("invalid property");
    }
  });
});

afterAll(async () => await sequelize.close());
