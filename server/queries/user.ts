import { User } from "../models";

export const findAll = async () => {
  return User.findAll();
};

export const findByPk = async (id: number) => {
  return User.findByPk(id);
};

export const findOneByUsername = async (username: string) => {
  return User.findOne({
    where: {
      username,
    },
  });
};
