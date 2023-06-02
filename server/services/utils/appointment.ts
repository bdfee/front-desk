import { findOneById, findByPk, findAll as find } from "../../queries/appointment";

export const findOne = async (id: number) => {
  const appointment = await findOneById(id);
  if (!appointment) {
    throw new Error("no matching appointment id found");
  }

  return appointment;
};

export const findOneByPk = async (id: number) => {
  const appointment = await findByPk(id);
  if (!appointment) {
    throw new Error("no matching appointment id found");
  }
  return appointment;
};

export const findAll = async () => find();
