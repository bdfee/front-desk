import { Patient, Specialist } from "../models";

export const getAll = async () => {
  return Patient.findAll({
    include: [
      {
        model: Specialist,
        attributes: ["name"],
      },
    ],
  });
};

export const getOneById = async (id: string) => {
  return Patient.findOne({
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
};

export const deleteOneById = async (id: string) => {
  return Patient.destroy({
    where: {
      patientId: id,
    },
  });
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
  return patient?.update({ ...patient, ...body });
};
