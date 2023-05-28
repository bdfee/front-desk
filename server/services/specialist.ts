import { Specialist } from "../models";

export const getAll = async () => Specialist.findAll();

export const getOneById = async (id: string) => {
  const specialist = await Specialist.findByPk(id);

  if (specialist === null) {
    throw new Error("No matching patient id found");
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
