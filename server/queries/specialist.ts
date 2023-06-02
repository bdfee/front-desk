import { Specialist } from "../models";

export const findByPk = async (id: number) => Specialist.findByPk(id);

export const findAll = async () => Specialist.findAll();
