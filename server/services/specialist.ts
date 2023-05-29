import { Specialist } from "../models";
import { isSpecialistInput } from "../types";
export const getAll = async () => Specialist.findAll();

export const create = async (specialistInput: object) => {
  if (!isSpecialistInput(specialistInput)) {
    throw new Error("Malformed or missing specialist input");
  }

  return Specialist.create(specialistInput);
};

export const getOneById = async (id: string) => {
  const specialist = await Specialist.findByPk(id);

  if (specialist === null) {
    throw new Error("No matching specialist id found");
  }

  return specialist;
};

export const deleteOneById = async (id: string) => {
  const specialist = await Specialist.findByPk(id);

  if (!specialist) {
    throw new Error("No matching specialist id found");
  }

  await specialist.destroy();

  return 1;
};

export const updateOneById = async (id: string, body: object) => {
  const specialist = await Specialist.findByPk(id);

  if (!specialist) {
    throw new Error("No matching specialist id found");
  }

  return specialist.update({ ...specialist, ...body });
};
