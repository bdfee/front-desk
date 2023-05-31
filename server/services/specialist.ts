import { Specialist } from "../models";
import { isSpecialistInput, validSpecialistProperties } from "../typeUtils";

export const create = async (object: unknown): Promise<Specialist> => {
  if (!validSpecialistProperties(object)) {
    throw new Error("invalid property on specialist input");
  }

  if (!isSpecialistInput(object)) {
    throw new Error("malformed or invalid value on specialist input");
  }

  try {
    return Specialist.create(object);
  } catch (error) {
    throw new Error("unknown error creating specialist: " + error);
  }
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

export const updateOneById = async (id: number, object: unknown): Promise<Specialist> => {
  const specialist = await Specialist.findByPk(id);

  if (!specialist) {
    throw new Error("No matching specialist id found");
  }

  if (!validSpecialistProperties(object)) {
    throw new Error("Invalid property");
  }

  return specialist.update({ ...specialist, ...object });
};
