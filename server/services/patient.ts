import { Patient } from "../models";
import { findOne, findAll, findOneByPk, findAllBySpecialist, countAllBySpecialist } from "./utils/patient";
import { validateDetail, validateInput, validateProperties } from "./validation/patient";

export const getAll = async (): Promise<Patient[]> => findAll();

export const getAllBySpecialist = async (specialistId: number): Promise<Patient[]> => findAllBySpecialist(specialistId);

export const getOneById = async (id: number): Promise<Patient> => findOne(id);

export const deleteOneById = async (id: number) => {
  await findOneByPk(id).then((patient) => patient.destroy());
  return 1;
};

export const updateOneById = async (id: number, object: unknown): Promise<Patient> => {
  const patient = await findOne(id);

  if (validateProperties(object)) {
    patient.set(object);
  }

  if (validateDetail(patient)) {
    return patient.save();
  } else throw new Error("Unknown error updating patient");
};

export const create = async (object: unknown): Promise<Patient> => {
  if (validateProperties(object) && validateInput(object)) return Patient.create(object);
  else throw new Error("Unknown error creating patient");
};

export const getCountBySpecialist = async (specialistId: number): Promise<number> => countAllBySpecialist(specialistId);
