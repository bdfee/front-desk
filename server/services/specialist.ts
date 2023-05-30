import { Specialist } from "../models";
import { isSpecialistInput } from "../typeUtils";

export const create = async (specialistInput: object): Promise<Specialist> => {
  if (!isSpecialistInput(specialistInput)) {
    throw new Error("Malformed or missing specialist input");
  }

  return Specialist.create(specialistInput);
};

export const getAll = async (): Promise<Specialist[]> => {
  return Specialist.findAll();
};

export const getOneById = async (id: number): Promise<Specialist> => {
  const specialist = await Specialist.findByPk(id);

  if (specialist === null) {
    throw new Error("No matching specialist id found");
  }

  return specialist;
};

export const deleteOneById = async (id: number) => {
  const specialist = await Specialist.findByPk(id);

  if (!specialist) {
    throw new Error("No matching specialist id found");
  }

  await specialist.destroy();

  return 1;
};

export const updateOneById = async (id: number, body: object): Promise<Specialist> => {
  const specialist = await Specialist.findByPk(id);

  if (!specialist) {
    throw new Error("No matching specialist id found");
  }

  return specialist.update({ ...specialist, ...body });
};
