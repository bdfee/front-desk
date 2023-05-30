import { Appointment, Specialist, Patient } from "../models";
import { isAppointmentInput } from "../typeUtils";

export const create = async (appointmentInput: object) => {
  if (!isAppointmentInput(appointmentInput)) {
    throw new Error("Malformed or missing appointment input");
  }

  return Appointment.create(appointmentInput, {
    include: [
      {
        model: Specialist,
        as: "specialist",
        attributes: ["name"],
      },
      {
        model: Patient,
        as: "patient",
        attributes: ["name"],
      },
    ],
    attributes: {
      exclude: ["specialistId", "patientId"],
    },
  });
};

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

export const getOneById = async (id: number) => {
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

  if (appointment === null) {
    throw new Error("No matching appointment id found");
  }

  return appointment;
};

export const deleteOneById = async (id: number) => {
  return Appointment.destroy({
    where: {
      appointmentId: id,
    },
  });
};

export const updateOneById = async (id: number, body: object) => {
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
