import { SpecialistProperties, Specialist } from "../../types";
import { validSpecialistProperties, isSpecialistInput, isSpecialist } from "../../typeUtils";

export const validateProperties = (object: unknown): object is SpecialistProperties => {
  if (!validSpecialistProperties(object)) {
    throw new Error("invalid property on specialist input");
  }
  return true;
};

export const validateInput = (object: unknown): object is Specialist => {
  if (!isSpecialistInput(object)) {
    throw new Error("malformed or invalid value on specialist input");
  }
  return true;
};

export const validateSpecialist = (object: unknown): object is Specialist => {
  if (!isSpecialist(object)) {
    throw new Error("malformed or invalid value on specialist");
  }
  return true;
};
