import {
  findByPk,
  findOneById,
  findAll as find,
  findAllByUserId as findByUser,
  findAllBySpecialistId as findBySpecialist,
  findAllByPatientId as findByPatient,
} from "../../queries/task";

export const findOne = async (id: number) => {
  const task = await findOneById(id);
  if (!task) {
    throw new Error("no matching task id found");
  }
  return task;
};

export const findOneByPk = async (id: number) => {
  const task = await findByPk(id);
  if (!task) {
    throw new Error("no matching task id found");
  }
  return task;
};

export const findAll = async () => find();

export const findAllByUser = async (userId: number) => findByUser(userId);

export const findAllBySpecialist = async (specialistId: number) => findBySpecialist(specialistId);

export const findAllByPatient = async (patientId: number) => findByPatient(patientId);
