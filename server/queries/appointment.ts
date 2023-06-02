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
