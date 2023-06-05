import {
  findOneById,
  findByPk,
  findAll as find,
  findAllByPatient as findByPatient,
  findAllBySpecialist as findBySpecialist,
  findAllByTimeframe as findByTimeframe,
} from "../../queries/appointment";

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

export const findAllByPatient = async (patientId: number) => findByPatient(patientId);

export const findAllBySpecialist = async (specialistId: number) => findBySpecialist(specialistId);

export const findAllByTimeframe = async (start: string, end: string) => findByTimeframe(start, end);
