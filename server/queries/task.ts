import { Task, Specialist, Patient } from "../models";

export const findByPk = async (id: number) => Task.findByPk(id);

export const findOneById = async (id: number) => {
  return Task.findOne({
    where: {
      taskId: id,
    },
    include: [
      {
        model: Specialist,
        attributes: ["name"],
      },
      {
        model: Patient,
        attributes: ["name"],
      },
    ],
  });
};

export const findAll = async () => {
  return Task.findAll({
    include: [
      {
        model: Specialist,
        attributes: ["name"],
      },
      {
        model: Patient,
        attributes: ["name"],
      },
    ],
  });
};

export const findAllByUserId = async (userId: number) => {
  return Task.findAll({
    where: {
      userId,
    },
    include: [
      {
        model: Specialist,
        attributes: ["name"],
      },
      {
        model: Patient,
        attributes: ["name"],
      },
    ],
  });
};

export const findAllBySpecialistId = async (specialistId: number) => {
  return Task.findAll({
    where: {
      specialistId,
    },
    include: [
      {
        model: Specialist,
        attributes: ["name"],
      },
      {
        model: Patient,
        attributes: ["name"],
      },
    ],
  });
};

export const findAllByPatientId = async (patientId: number) => {
  return Task.findAll({
    where: {
      patientId,
    },
    include: [
      {
        model: Specialist,
        attributes: ["name"],
      },
      {
        model: Patient,
        attributes: ["name"],
      },
    ],
  });
};
