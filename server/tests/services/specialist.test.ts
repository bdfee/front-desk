import { Specialist } from "../../models";
import { sequelize } from "../../utils/connectToDb";
import { createTestSpecialist, dropAllTables } from "../helpers";
import { deleteOneById, updateOneById } from "../../services/specialist";

beforeEach(async () => await dropAllTables());

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
