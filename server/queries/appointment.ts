import { Appointment, Specialist, Patient } from "../models";
import { Op } from "sequelize";

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

export const countUpcomingBySpecialist = async (specialistId: number) => {
  const currentDate = new Date();
  const nextWeekDate = new Date();
  nextWeekDate.setDate(currentDate.getDate() + 7);

  return Appointment.count({
    where: {
      specialistId,
      date: {
        [Op.between]: [currentDate, nextWeekDate],
      },
    },
    include: [
      {
        model: Specialist,
        attributes: ["name"],
      },
    ],
  });
};

export const findAllByDateframe = async (startDate: string, endDate: string) => {
  return Appointment.findAll({
    where: {
      date: {
        [Op.between]: [startDate, endDate],
      },
    },
  });
};
