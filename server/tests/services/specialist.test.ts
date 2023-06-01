import { Specialist } from "../../models";
import { sequelize } from "../../utils/connectToDb";
import { createTestSpecialist, dropAllTables } from "../helpers/models";
import { expectSpecialist } from "../helpers/shape";
import { deleteOneById, updateOneById, getOneById, create, getAll } from "../../services/specialist";

beforeEach(async () => await dropAllTables());

describe("returned shape from specialistService", () => {
  test("getAll()", async () => {
    await createTestSpecialist();
    const [specialist] = await getAll();

    expectSpecialist(specialist);
  });

  test("updateOneById()", async () => {
    const { specialistId } = await createTestSpecialist();
    const update = { name: "update name" };
    expectSpecialist(await updateOneById(specialistId, update));
  });

  test("create()", async () => {
    expectSpecialist(
      await create({
        name: "test specialist",
        speciality: "testing",
      })
    );
  });
  Specialist.getAttributes();

  test("getOneById()", async () => {
    const { specialistId } = await createTestSpecialist();
    expectSpecialist(await getOneById(specialistId));
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
    expect(await Specialist.count()).toBe(0);
    try {
      await create({
        speciality: "test speciality",
      });
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("malformed or invalid value on specialist input");
    }
  });
});

describe("getAll()", () => {
  test("returns all specialists", async () => {
    await createTestSpecialist();
    await createTestSpecialist();
    await createTestSpecialist();

    expect(await Specialist.count()).toBe(3);
    expect(await getAll()).toHaveLength(3);
  });

  test("no patients returns empty array", async () => {
    expect(await Specialist.count()).toBe(0);
    expect(await getAll()).toHaveLength(0);
  });
});

describe("getOneById()", () => {
  test("returns specialist", async () => {
    await createTestSpecialist();
    const { specialistId } = await createTestSpecialist();
    expect(await Specialist.count()).toBe(2);
    const specialist = await getOneById(specialistId);

    expect(specialist.specialistId).toBe(2);
  });
  test("no id match returns expected message", async () => {
    await createTestSpecialist();
    expect(await Specialist.count()).toBe(1);

    try {
      await getOneById(2);
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("no matching specialist id found");
    }

    expect(await Specialist.count()).toBe(1);
  });
});

describe("deleteOneById()", () => {
  test("can delete by ID", async () => {
    const { specialistId } = await createTestSpecialist();
    await createTestSpecialist();

    expect(await Specialist.count()).toBe(2);
    await deleteOneById(specialistId);

    expect(await Specialist.count()).toBe(1);
  });

  test("no id match returns expected message", async () => {
    await createTestSpecialist();
    expect(await Specialist.count()).toBe(1);

    try {
      await deleteOneById(2);
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("no matching specialist id found");
    }

    expect(await Specialist.count()).toBe(1);
  });
});

describe("updateOneById()", () => {
  test("can update by ID", async () => {
    const specialist = await createTestSpecialist();
    await updateOneById(specialist.specialistId, { name: "update name" });

    expect(await Specialist.count()).toBe(1);

    const updatedSpecialist = await Specialist.findByPk(specialist.specialistId);

    expect(updatedSpecialist?.name).toEqual("update name");
    expect(await Specialist.count()).toBe(1);
  });

  test("no id match returns expected error message", async () => {
    const specialist = await createTestSpecialist();
    expect(await Specialist.count()).toBe(1);

    try {
      await updateOneById(2, { name: "update name" });
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("no matching specialist id found");
    }
    const unchangedSpecialist = await Specialist.findByPk(specialist.specialistId);
    expect(unchangedSpecialist?.name).toBe("test specialist");
    expect(await Specialist.count()).toBe(1);
  });

  test("invalid property returns expected error message", async () => {
    await createTestSpecialist();
    expect(await Specialist.count()).toBe(1);

    try {
      await updateOneById(1, { invalid: "invalid update" });
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("invalid property");
    }
  });
});

afterAll(async () => await sequelize.close());
