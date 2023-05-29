import { Specialist } from "../../models";
import { sequelize } from "../../utils/connectToDb";
import { createTestSpecialist, dropAllTables } from "../helpers";
import { deleteOneById, updateOneById, getOneById, create } from "../../services/specialist";
import { isSpecialistInput } from "../../types";
beforeEach(async () => await dropAllTables());

const expectSpecialistInformation = (specialist: object) => {
  expect(specialist).toMatchObject({
    specialistId: expect.any(Number) as unknown as number,
    name: expect.any(String) as unknown as string,
    speciality: expect.any(String) as unknown as string,
  });
};

describe("returned shape", () => {
  test("updateOneById()", async () => {
    const { specialistId } = await createTestSpecialist();
    const update = { name: "update name" };
    expectSpecialistInformation(await updateOneById(`${specialistId}`, update));
  });

  test("create()", async () => {
    const specialist = await create({
      name: "test specialist",
      speciality: "testing",
    });
    if (isSpecialistInput(specialist)) {
      expectSpecialistInformation(specialist);
    }
  });

  test("getOneById()", async () => {
    const { specialistId } = await createTestSpecialist();
    expectSpecialistInformation(await getOneById(`${specialistId}`));
  });
});

describe("create()", () => {
  test("creates specialist", async () => {
    expect(await Specialist.count()).toBe(0);
    await create({
      name: "test specialist",
      speciality: "test speciality",
    });
    expect(await Specialist.count()).toBe(1);
  });

  test("no creation returns expected message", async () => {
    // todo
  });
});

describe("getOneById()", () => {
  test("returns specialist", async () => {
    await createTestSpecialist();
    const { specialistId } = await createTestSpecialist();
    expect(await Specialist.count()).toBe(2);
    const specialist = await getOneById(`${specialistId}`);

    expect(specialist.specialistId).toBe(2);
  });
  test("no id match returns expected message", async () => {
    await createTestSpecialist();
    expect(await Specialist.count()).toBe(1);

    try {
      await getOneById("2");
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("No matching specialist id found");
    }

    expect(await Specialist.count()).toBe(1);
  });
});

describe("deleteOneById()", () => {
  test("can delete by ID", async () => {
    const { specialistId } = await createTestSpecialist();
    await createTestSpecialist();

    expect(await Specialist.count()).toBe(2);
    await deleteOneById(`${specialistId}`);

    expect(await Specialist.count()).toBe(1);
  });

  test("no id match returns expected message", async () => {
    await createTestSpecialist();
    expect(await Specialist.count()).toBe(1);

    try {
      await deleteOneById("2");
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("No matching specialist id found");
    }

    expect(await Specialist.count()).toBe(1);
  });
});

describe("updateOneById()", () => {
  test("can update by ID", async () => {
    const specialist = await createTestSpecialist();
    await updateOneById(`${specialist.specialistId}`, { name: "update name" });

    expect(await Specialist.count()).toBe(1);

    const updatedSpecialist = await Specialist.findByPk(specialist.specialistId);

    expect(updatedSpecialist?.name).toEqual("update name");
    expect(await Specialist.count()).toBe(1);
  });

  test("no id match returns expected error message", async () => {
    const specialist = await createTestSpecialist();
    expect(await Specialist.count()).toBe(1);

    try {
      await updateOneById("2", { name: "update name" });
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("No matching specialist id found");
    }
    const unchangedSpecialist = await Specialist.findByPk(specialist.specialistId);
    expect(unchangedSpecialist?.name).toBe("test specialist");
    expect(await Specialist.count()).toBe(1);
  });
});

afterAll(async () => await sequelize.close());
