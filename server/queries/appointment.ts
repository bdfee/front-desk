import { Appointment, Specialist, Patient } from "../models";
import { Op } from "sequelize";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(timezone);
dayjs.extend(utc);

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
  const currentDate = dayjs();
  const nextWeekDate = currentDate.add(7, "day");

  const { startTime, startDate, endDate } = {
    startTime: currentDate.format("HH:mm:ss"),
    startDate: currentDate.format("YYYY-MM-DD"),
    endDate: nextWeekDate.format("YYYY-MM-DD"),
  };

  return Appointment.count({
    where: {
      specialistId,
      date: {
        [Op.between]: [startDate, endDate],
      },
      [Op.or]: [
        {
          date: startDate,
          start: { [Op.gte]: startTime },
        },
        {
          date: { [Op.gt]: startDate },
        },
      ],
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
