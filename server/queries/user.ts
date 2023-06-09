import { User } from "../models";

export const findAll = async () => User.findAll();

export const findByPk = async (id: number) => User.findByPk(id);

export const findOneByUsername = async (username: string) => {
  return User.findOne({
    where: {
      username,
    },
  });
};

export const findCreatedByPk = async (id: number) => {
  return User.findByPk(id, {
    attributes: {
      exclude: ["password"],
    },
  });
};
