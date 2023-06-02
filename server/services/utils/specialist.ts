import { findByPk, findAll as find } from "../../queries/specialist";

export const findOneByPk = async (id: number) => {
  const specialist = await findByPk(id);
  if (!specialist) {
    throw new Error("no matching specialist id found");
  }
  return specialist;
};

export const findAll = async () => find();
