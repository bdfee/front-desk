import { Appointment } from "../models";
import { findOne, findOneByPk, findAll } from "./utils/appointment";
import { validateInput, validateProperties, validateDetail } from "./validation/appointment";

export const getAll = async (): Promise<Appointment[]> => findAll();

export const getOneById = async (id: number): Promise<Appointment> => findOne(id);

export const deleteOneById = async (id: number) => {
  await findOneByPk(id).then((appointment) => appointment.destroy());
  return 1;
};

export const updateOneById = async (id: number, object: unknown): Promise<Appointment> => {
  const appointment = await findOne(id);

  if (validateProperties(object)) {
    appointment.set(object);
  }

  if (validateDetail(appointment)) {
    return appointment.save();
  } else throw new Error("Unknown error updating appointment");
};

export const create = async (object: unknown): Promise<Appointment> => {
  if (validateProperties(object) && validateInput(object)) return Appointment.create(object);
  else throw new Error("Unknown error creating appointment");
};
