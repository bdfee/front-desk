import { Op } from "sequelize";
import { Appointment, Specialist, Patient } from "../models";

export const findByPk = async (id: number) => Appointment.findByPk(id);

export const findOneById = async (id: number) => {
  return Appointment.findOne({
    where: {
      appointmentId: id,
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
  return Appointment.findAll({
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

export const findAllByPatient = async (patientId: number) => {
  return Appointment.findAll({
    where: {
      patientId,
    },
    include: [
      {
        model: Specialist,
        attributes: ["name"],
      },
    ],
  });
};

export const findAllBySpecialist = async (specialistId: number) => {
  return Appointment.findAll({
    where: {
      specialistId,
    },
    include: [
      {
        model: Specialist,
        attributes: ["name"],
      },
    ],
  });
};

export const findAllByTimeframe = async (start: string, end: string) => {
  return Appointment.findAll({
    where: {
      date: {
        [Op.and]: [
          {
            [Op.gte]: new Date(start),
          },
          {
            [Op.lt]: new Date(end),
          },
        ],
      },
    },
  });
};
