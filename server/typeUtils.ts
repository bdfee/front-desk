import { Specialist, Patient, Appointment } from "./models";
import { PatientInformationAttributes, AppointmentInformationAttributes } from "./types";

// check for properties and assert type

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
  const { name, email, phone, dateOfBirth, gender, address, specialistId } = object as Patient;
  return (
    typeof name === "string" &&
    typeof email === "string" &&
    typeof phone === "string" &&
    typeof dateOfBirth === "string" &&
    typeof gender === "string" &&
    typeof address === "string" &&
    typeof specialistId === "number"
  );
};

export const isPatientInformation = (object: unknown): object is PatientInformationAttributes => {
  if (typeof object !== "object" || object === null) {
    return false;
  }

  const { name, email, phone, dateOfBirth, gender, address, specialist } = object as PatientInformationAttributes;
  const { name: specialistName } = specialist as { name: string };

  return (
    typeof name === "string" &&
    typeof email === "string" &&
    typeof phone === "string" &&
    typeof dateOfBirth === "string" &&
    typeof gender === "string" &&
    typeof address === "string" &&
    typeof specialist === "object" &&
    typeof specialistName === "string"
  );
};

export const isAppointmentInput = (object: unknown): object is Appointment => {
  if (typeof object !== "object" || object === null) {
    return false;
  }
  const { patientId, specialistId, date, start, end, type, description } = object as Appointment;

  return (
    typeof patientId === "number" &&
    typeof specialistId === "number" &&
    typeof date === "string" &&
    typeof start === "string" &&
    typeof end === "string" &&
    typeof type === "string" &&
    typeof description === "string"
  );
};

export const isAppointmentInformation = (object: unknown): object is AppointmentInformationAttributes => {
  if (typeof object !== "object" || object === null) {
    return false;
  }

  const { date, start, end, type, description, specialist, patient } = object as AppointmentInformationAttributes;
  const { name: specialistName } = specialist as { name: string };
  const { name: patientName } = patient as { name: string };

  return (
    typeof date === "string" &&
    typeof start === "string" &&
    typeof end === "string" &&
    typeof type === "string" &&
    typeof description === "string" &&
    typeof specialist === "object" &&
    typeof patient === "object" &&
    typeof specialistName === "string" &&
    typeof patientName === "string"
  );
};
