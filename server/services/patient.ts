import { Patient, Specialist } from "../models";
import { isPatientInput } from "../typeUtils";

export const create = async (patientInput: object) => {
  if (!isPatientInput(patientInput)) {
    throw new Error("Malformed or missing patient input");
  }

  return Patient.create(patientInput);
};

export const getAll = async () => {
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

export const getOneById = async (id: number) => {
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
    throw new Error("No matching patient id found");
  }

  return patient;
};

export const deleteOneById = async (id: number) => {
  const patient = await Patient.findByPk(id);

  if (!patient) {
    throw new Error("No matching patient id found");
  }

  await patient.destroy();
  return 1;
};

export const updateOneById = async (id: number, body: object) => {
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
    throw new Error("No matching patient id found");
  }
  return patient.update({ ...patient, ...body });
};
