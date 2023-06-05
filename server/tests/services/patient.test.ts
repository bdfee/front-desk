import { Patient, PatientDetail } from "../../types";
import { sequelize } from "../../utils/connectToDb";
import {
  getAll,
  deleteOneById,
  updateOneById,
  getOneById,
  create,
  getAllBySpecialist,
  getCountBySpecialist,
} from "../../services/patient";
import { Patient as PatientModel } from "../../models";
import {
  createTestPatient,
  createTestPatientAndSpecialist,
  createTestSpecialist,
  dropAllTables,
} from "../helpers/models";
import { expectPatientDetail, expectPatient } from "../helpers/shape";

beforeEach(async () => await dropAllTables());
describe("returned shape from patientService", () => {
  test("getAll()", async () => {
    await createTestPatientAndSpecialist();
    const [patient] = await getAll();

    expectPatientDetail(patient as PatientDetail);
  });

  test("getOneById()", async () => {
    await createTestPatientAndSpecialist();
    expectPatientDetail((await getOneById(1)) as PatientDetail);
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
      })) as Patient
    );
  });

  test("updateOneById() patient", async () => {
    const { patientId } = await createTestPatientAndSpecialist();
    const update = { name: "update name" };

    expectPatientDetail((await updateOneById(patientId, update)) as PatientDetail);
  });

  test("getAllBySpecialist", async () => {
    const { specialistId } = await createTestPatientAndSpecialist();

    const patientList = await getAllBySpecialist(specialistId);

    expectPatient(patientList[0] as Patient);
  });
});

describe("create()", () => {
  test("creates patient", async () => {
    await createTestSpecialist();

    expect(await PatientModel.count()).toBe(0);
    await create({
      name: "test patient",
      email: "test@test.com",
      phone: "1234567890",
      dateOfBirth: "2020-02-02",
      gender: "male",
      address: "123 street city state",
      specialistId: 1,
    });
    expect(await PatientModel.count()).toBe(1);
  });

  test("no creation returns expected message", async () => {
    expect(await PatientModel.count()).toBe(0);
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
      error instanceof Error && expect(error.message).toBe("malformed or invalid value on patient input");
    }
    expect(await PatientModel.count()).toBe(0);
  });
});

describe("getAll()", () => {
  test("returns all patients", async () => {
    await createTestPatientAndSpecialist();
    await createTestPatientAndSpecialist();
    await createTestPatientAndSpecialist();

    expect(await PatientModel.count()).toBe(3);
    expect(await getAll()).toHaveLength(3);
  });

  test("no patients returns empty array", async () => {
    expect(await PatientModel.count()).toBe(0);
    expect(await getAll()).toHaveLength(0);
  });
});

describe("getOneById()", () => {
  test("returns patient by id", async () => {
    await createTestPatientAndSpecialist();
    const patient = await getOneById(1);
    expect(await PatientModel.count()).toBe(1);
    expect(patient?.patientId).toBe(1);
  });

  test("no id match returns expected error message", async () => {
    await createTestPatientAndSpecialist();
    expect(await PatientModel.count()).toBe(1);

    try {
      await getOneById(2);
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("no matching patient id found");
    }

    expect(await PatientModel.count()).toBe(1);
  });
});

describe("deleteOneById()", () => {
  test("deletes patient by ID", async () => {
    const { patientId } = await createTestPatientAndSpecialist();
    await createTestPatientAndSpecialist();

    expect(await PatientModel.count()).toBe(2);
    await deleteOneById(patientId);

    expect(await PatientModel.count()).toBe(1);
  });

  test("no id match returns expected error message", async () => {
    await createTestPatientAndSpecialist();
    expect(await PatientModel.count()).toBe(1);

    try {
      await deleteOneById(2);
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("no matching patient id found");
    }

    expect(await PatientModel.count()).toBe(1);
  });
});

describe("updateOneById", () => {
  test("updates one patient by id", async () => {
    const { patientId } = await createTestPatientAndSpecialist();
    await updateOneById(patientId, { name: "update name" });

    expect(await PatientModel.count()).toBe(1);

    const updatedPatient = (await PatientModel.findByPk(patientId)) as PatientDetail;

    expect(updatedPatient?.name).toEqual("update name");
    expect(await PatientModel.count()).toBe(1);
  });

  test("no id match returns expected error message", async () => {
    await createTestPatientAndSpecialist();
    expect(await PatientModel.count()).toBe(1);

    try {
      await updateOneById(2, { name: "update name" });
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("no matching patient id found");
    }

    expect(await PatientModel.count()).toBe(1);
  });

  test("invalid property returns expected error message", async () => {
    await createTestPatientAndSpecialist();
    expect(await PatientModel.count()).toBe(1);

    try {
      await updateOneById(1, { invalid: "invalid update" });
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("invalid property on patient input");
    }
  });
});

describe("getCountBySpecialist", () => {
  test("returns count by specialist", async () => {
    await createTestPatientAndSpecialist();

    const { specialistId } = await createTestPatientAndSpecialist();
    await createTestPatient(specialistId);
    await createTestPatient(specialistId);

    expect(await getCountBySpecialist(specialistId)).toBe(3);
  });

  test("returns zero when no patients", async () => {
    const { specialistId } = await createTestSpecialist();
    expect(await getCountBySpecialist(specialistId)).toBe(0);
  });
});

describe("getAllBySpecialist", () => {
  test("returns patients by specialist", async () => {
    await createTestPatientAndSpecialist();

    const { specialistId } = await createTestPatientAndSpecialist();
    await createTestPatient(specialistId);
    await createTestPatient(specialistId);

    const patientList = await getAllBySpecialist(specialistId);
    expect(patientList).toHaveLength(3);
  });

  test("returns empty array when no patients", async () => {
    const { specialistId } = await createTestSpecialist();
    expect(await getAllBySpecialist(specialistId)).toHaveLength(0);
  });
});

afterAll(async () => await sequelize.close());
