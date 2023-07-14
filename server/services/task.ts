import { Task } from "../models";
import { findOne, findOneByPk, findAll, findAllByPatient, findAllBySpecialist, findAllByUser } from "./utils/tasks";
import { validateInput, validateProperties, validateDetail } from "./validation/task";

export const getAll = async (): Promise<Task[]> => findAll();

export const getOneById = async (id: number): Promise<Task> => findOne(id);

export const getAllByPatient = async (patientId: number): Promise<Task[]> => findAllByPatient(patientId);

export const getAllBySpecialist = async (specialistId: number): Promise<Task[]> => findAllBySpecialist(specialistId);

export const getAllByUser = async (userId: number): Promise<Task[]> => findAllByUser(userId);

export const deleteOneById = async (id: number) => {
  await findOneByPk(id).then((task) => task.destroy());
};

export const updateOneById = async (id: number, object: unknown): Promise<Task> => {
  const task = await findOne(id);

  if (validateProperties(object)) {
    task.set(object);
  }

  if (validateDetail(task)) {
    return task.save();
  }

  throw new Error("Unknown error updating task");
};

export const create = async (object: unknown): Promise<Task> => {
  if (validateProperties(object) && validateInput(object)) {
    return Task.create(object);
  }
  throw new Error("Unknown error creating task");
};
