import { Patient } from "../../models";
import { sequelize } from "../../utils/connectToDb";
import { createTestPatientAndSpecialist, dropAllTables } from "../helpers";
import { getAll, deleteOneById, updateOneById, getOneById } from "../../services/patient";
// import { isPatientInput } from "../../types";

beforeEach(async () => await dropAllTables());

const expectPatientInformation = (patient: object) => {
  expect(patient).toMatchObject({
    patientId: expect.any(Number) as unknown as number,
    name: expect.any(String) as unknown as string,
    email: expect.any(String) as unknown as string,
    phone: expect.any(String) as unknown as string,
    dateOfBirth: expect.any(String) as unknown as string,
    gender: expect.any(String) as unknown as string,
    address: expect.any(String) as unknown as string,
    specialist: {
      name: expect.any(String) as unknown as string,
    },
  });
};

describe("returned shape", () => {
  test("getAll()", async () => {
    await createTestPatientAndSpecialist();
    const [patient] = await getAll();
    expectPatientInformation(patient);
  });

  test("getOneById()", async () => {
    await createTestPatientAndSpecialist();
    const patient = await getOneById("1");
    expectPatientInformation(patient);
  });

  test("create()", async () => {
    // todo
  });

  test("updateOneById() patient", async () => {
    const { patientId } = await createTestPatientAndSpecialist();
    const update = { name: "update name" };
    const updatedPatient = await updateOneById(`${patientId}`, update);
    expectPatientInformation(updatedPatient);
  });
});

describe("create()", () => {
  test("creates patient", async () => {
    // todo
  });
});

describe("getAll()", () => {
  // todo
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
    const patient = await getOneById("1");
    expect(await Patient.count()).toBe(1);
    expect(patient?.patientId).toBe(1);
  });

  test("no id match returns expected error message", async () => {
    await createTestPatientAndSpecialist();
    expect(await Patient.count()).toBe(1);

    try {
      await getOneById("2");
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
    await deleteOneById(`${patientId}`);

    expect(await Patient.count()).toBe(1);
  });

  test("no id match returns expected error message", async () => {
    await createTestPatientAndSpecialist();
    expect(await Patient.count()).toBe(1);

    try {
      await deleteOneById("2");
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("No matching patient id found");
    }

    expect(await Patient.count()).toBe(1);
  });
});

describe("updateOneById", () => {
  test("updates one patient by id", async () => {
    const { patientId } = await createTestPatientAndSpecialist();
    await updateOneById(`${patientId}`, { name: "update name" });

    expect(await Patient.count()).toBe(1);

    const updatedPatient = await Patient.findByPk(patientId);

    expect(updatedPatient?.name).toEqual("update name");
    expect(await Patient.count()).toBe(1);
  });

  test("no id match returns expected error message", async () => {
    const { patientId } = await createTestPatientAndSpecialist();
    expect(await Patient.count()).toBe(1);

    try {
      await updateOneById("2", { name: "update name" });
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("No matching patient id found");
    }
    const unchangedPatient = await Patient.findByPk(patientId);
    expect(unchangedPatient?.name).toBe("test patient");
    expect(await Patient.count()).toBe(1);
  });
});

afterAll(async () => await sequelize.close());
