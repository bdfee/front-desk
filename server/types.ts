import { Specialist, Patient } from "./models";

export const isSpecialistInput = (object: unknown): object is Specialist => {
  if (typeof object !== "object" || object === null) {
    return false;
  }

  const { name, speciality } = object as Specialist;
  return typeof name === "string" && typeof speciality === "string";
};

export const isPatientInput = (object: unknown): object is Patient => {
  if (typeof object !== "object" || object === null) {
    return false;
  }
  const { name, email, phone, dateOfBirth, gender, address, specialist } = object as Patient;
  return (
    typeof name === "string" &&
    typeof email === "string" &&
    typeof phone === "string" &&
    typeof dateOfBirth === "string" &&
    typeof gender === "string" &&
    typeof address === "string" &&
    typeof specialist === "object"
  );
};
