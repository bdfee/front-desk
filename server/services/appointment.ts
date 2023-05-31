import { Appointment, Specialist, Patient } from "../models";
import { appointmentProperties, isAppointmentInput } from "../typeUtils";

export const create = async (appointmentInput: object): Promise<Appointment> => {
  if (!isAppointmentInput(appointmentInput)) {
    throw new Error("Malformed or missing appointment input");
  }

  return Appointment.create(appointmentInput);
};

export const getAll = async (): Promise<Appointment[]> => {
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

export const getOneById = async (id: number): Promise<Appointment> => {
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
  const appointment = await Appointment.findByPk(id);

  if (!appointment) {
    throw new Error("No matching appointment id found");
  }

  await appointment.destroy();
  return 1;
};

export const updateOneById = async (id: number, object: unknown): Promise<Appointment> => {
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

  if (!appointment) {
    throw new Error("No matching appointment id found");
  }

  if (!appointmentProperties(object)) {
    throw new Error("Invalid property");
  }

  return appointment.update({ ...appointment, ...object });
};
