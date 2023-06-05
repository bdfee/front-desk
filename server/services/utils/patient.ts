import {
  findOneById,
  findByPk,
  findAll as find,
  findAllBySpecialist as findBySpecialist,
  countAllBySpecialist as countBySpecialist,
} from "../../queries/patient";

export const findOne = async (id: number) => {
  const patient = await findOneById(id);
  if (!patient) {
    throw new Error("no matching patient id found");
  }
  return patient;
};

export const findOneByPk = async (id: number) => {
  const patient = await findByPk(id);
  if (!patient) {
    throw new Error("no matching patient id found");
  }
  return patient;
};

export const findAll = async () => find();

export const findAllBySpecialist = async (id: number) => findBySpecialist(id);

export const countAllBySpecialist = async (id: number) => countBySpecialist(id);
