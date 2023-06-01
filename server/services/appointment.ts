import { Specialist, Patient, Appointment } from "../models";
import { isAppointmentInput, isAppointmentDetail, validAppointmentProperties } from "../typeUtils";

export const create = async (object: unknown): Promise<Appointment> => {
  if (!validAppointmentProperties(object)) {
    throw new Error("invalid property on appointment input");
  }

  if (!isAppointmentInput(object)) {
    throw new Error("malformed or invalid value on appointment input");
  }
  try {
    return Appointment.create(object);
  } catch (error) {
    throw new Error("unknown error creating appointment: " + error);
  }
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
    throw new Error("no matching appointment id found");
  }

  return appointment;
};

export const deleteOneById = async (id: number) => {
  const appointment = await Appointment.findByPk(id);

  if (!appointment) {
    throw new Error("no matching appointment id found");
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
    throw new Error("no matching appointment id found");
  }

  if (!validAppointmentProperties(object)) {
    throw new Error("invalid property");
  }

  appointment.set(object);

  if (!isAppointmentDetail(appointment)) {
    throw new Error("malformed or invalid value on appointment");
  }

  return appointment.save();
};
