import { Specialist } from "../models";
import { validateProperties, validateInput, validateSpecialist } from "./validation/specialist";
import { findOneByPk, findAll } from "./utils/specialist";
import { countAllBySpecialist } from "./utils/patient";
import { countUpcomingBySpecialist } from "../queries/appointment";

export const getAll = async (): Promise<Specialist[]> => findAll();

export const getOneById = async (id: number): Promise<Specialist> => findOneByPk(id);

export const deleteOneById = async (id: number) => {
  await findOneByPk(id).then((specialist) => specialist.destroy());
  return 1;
};

export const updateOneById = async (id: number, object: unknown): Promise<Specialist> => {
  const specialist = await findOneByPk(id);

  if (validateProperties(object)) {
    specialist.set(object);
  }

  if (validateSpecialist(specialist)) {
    return specialist.save();
  } else throw new Error("unknown error update");
};

export const create = async (object: unknown): Promise<Specialist> => {
  if (validateProperties(object) && validateInput(object)) {
    return Specialist.create(object);
  } else throw new Error("unknown error creating specialist");
};

export const getTableData = async () => {
  const specialists = await findAll();
  const dataPromises = specialists.map(async (specialist) => {
    if (Number(specialist.specialistId)) {
      const appointmentCount = await countUpcomingBySpecialist(specialist.specialistId);
      const patientCount = await countAllBySpecialist(specialist.specialistId);

      return {
        specialist,
        appointmentCount,
        patientCount,
      };
    } else throw new Error("error");
  });

  return Promise.all(dataPromises);
};
