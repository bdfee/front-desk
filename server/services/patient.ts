import { Patient, Specialist } from "../models";

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

export const getOneById = async (id: string) => {
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

export const deleteOneById = async (id: string) => {
  const patient = await Patient.findByPk(id);

  if (!patient) {
    throw new Error("No matching patient id found");
  }

  await patient.destroy();
  return 1;
};

export const updateOneById = async (id: string, body: object) => {
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
