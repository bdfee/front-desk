import { Appointment, Specialist, Patient } from "../models";

export const getAll = async () => {
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

export const getOneById = async (id: string) => {
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

export const deleteOneById = async (id: string) => {
  return Appointment.destroy({
    where: {
      appointmentId: id,
    },
  });
};

export const updateOneById = async (id: string, body: object) => {
  const appointment = await Appointment.findOne({
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
  return appointment?.update({ ...appointment, ...body });
};
