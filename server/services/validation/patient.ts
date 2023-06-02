import { Patient, PatientDetail, PatientProperties } from "../../types";
import { isPatientDetail, isPatientInput, validPatientProperties } from "../../typeUtils";

export const validateProperties = (object: unknown): object is PatientProperties => {
  if (!validPatientProperties(object)) {
    throw new Error("invalid property on patient input");
  }
  return true;
};

export const validateInput = (object: unknown): object is Patient => {
  if (!isPatientInput(object)) {
    throw new Error("malformed or invalid value on patient input");
  }
  return true;
};

export const validateDetail = (object: unknown): object is PatientDetail => {
  if (!isPatientDetail(object)) {
    throw new Error("malformed or invalid value on patient");
  }
  return true;
};
