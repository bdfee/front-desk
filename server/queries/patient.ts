import { Specialist, Patient } from "../models";

export const findByPk = async (id: number) => Patient.findByPk(id);

export const findOneById = async (id: number) => {
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

export const findAll = async () => {
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

export const findAllBySpecialist = async (specialistId: number) => {
  return Patient.findAll({
    where: { specialistId },
  });
};

export const countAllBySpecialist = async (specialistId: number) => {
  return Patient.count({
    where: { specialistId },
  });
};
