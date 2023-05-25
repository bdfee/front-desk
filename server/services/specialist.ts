import { Specialist } from "../models";

export const deleteOneById = async (id: string) => {
  return Specialist.destroy({
    where: {
      specialistId: id,
    },
  });
};

export const updateOneById = async (id: string, body: object) => {
  const specialist = await Specialist.findByPk(id);
  return specialist?.update({ ...specialist, ...body });
};
