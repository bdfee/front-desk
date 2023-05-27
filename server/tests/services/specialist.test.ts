/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Specialist } from "../../models";
import { sequelize } from "../../utils/connectToDb";
import { createTestSpecialist, dropAllTables } from "../helpers";
import { deleteOneById, updateOneById } from "../../services/specialist";

beforeEach(async () => await dropAllTables());

describe("deleting specialists", () => {
  test("can delete by ID", async () => {
    const { specialistId } = await createTestSpecialist();
    await createTestSpecialist();

    expect(await Specialist.count()).toBe(2);
    await deleteOneById(`${specialistId}`);

    expect(await Specialist.count()).toBe(1);
  });
});

describe("updating specialists", () => {
  test("can update by ID", async () => {
    const specialist = await createTestSpecialist();
    await updateOneById(`${specialist.specialistId}`, { name: "update name" });

    expect(await Specialist.count()).toBe(1);

    const updatedSpecialist = await Specialist.findByPk(specialist.specialistId);

    expect(updatedSpecialist?.name).toEqual("update name");
    expect(await Specialist.count()).toBe(1);
  });
});

afterAll(async () => await sequelize.close());

// what error is returned?
