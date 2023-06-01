import { Specialist, Patient } from "../models";
import { isPatientInput, isPatientDetail, validPatientProperties } from "../typeUtils";

export const create = async (object: unknown): Promise<Patient> => {
  if (!validPatientProperties(object)) {
    throw new Error("invalid property on patient input");
  }

  if (!isPatientInput(object)) {
    throw new Error("malformed or invalid value on patient input");
  }

  try {
    return Patient.create(object);
  } catch (error) {
    throw new Error("unknown error creating patient: " + error);
  }
};

export const getAll = async (): Promise<Patient[]> => {
  return Patient.findAll({
    include: [
      {
        model: Specialist,
        as: "specialist",
        attributes: ["name"],
      },
    ],
    attributes: {
      exclude: ["specialistId"],
    },
  });
};

export const getOneById = async (id: number): Promise<Patient> => {
  const patient = await Patient.findOne({
    where: {
      patientId: id,
    },
    include: [
      {
        model: Specialist,
        attributes: ["name"],
      },
    ],
  });

  if (patient === null) {
    throw new Error("no matching patient id found");
  }

  return patient;
};

export const deleteOneById = async (id: number) => {
  const patient = await Patient.findByPk(id);

  if (!patient) {
    throw new Error("no matching patient id found");
  }

  await patient.destroy();
  return 1;
};

export const updateOneById = async (id: number, object: unknown): Promise<Patient> => {
  const patient = await Patient.findOne({
    where: {
      patientId: id,
    },
    include: [
      {
        model: Specialist,
        attributes: ["name"],
      },
    ],
  });
  if (!patient) {
    throw new Error("no matching patient id found");
  }

  if (!validPatientProperties(object)) {
    throw new Error("invalid property");
  }

  patient.set(object);

  if (!isPatientDetail(patient)) {
    throw new Error("malformed or invalid value on patient");
  }

  return patient.save();
};
