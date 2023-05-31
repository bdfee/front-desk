import { Specialist, Patient, Appointment } from "./models";
import {
  PatientInformationAttributes,
  AppointmentInformationAttributes,
  SpecialistProperties,
  PatientProperties,
  AppointmentProperties,
} from "./types";

export const isSpecialistInput = (object: unknown): object is Specialist => {
  if (typeof object !== "object" || object === null) {
    throw new Error("malformed or missing object");
  }

  const { name, speciality } = object as Specialist;
  return typeof name === "string" && typeof speciality === "string";
};

export const isSpecialist = (object: unknown): object is Specialist => {
  if (typeof object !== "object" || object === null) {
    throw new Error("malformed or missing object");
  }

  const { specialistId, name, speciality } = object as Specialist;
  return typeof specialistId === "number" && typeof name === "string" && typeof speciality === "string";
};

export const specialistProperties = (object: unknown): object is SpecialistProperties => {
  if (typeof object !== "object" || object === null) {
    throw new Error("malformed or missing object");
  }
  for (const key in object) {
    if (!["specialistId", "name", "speciality"].includes(key)) {
      throw new Error("invalid property");
    }
  }
  return true;
};

export const patientProperties = (object: unknown): object is PatientProperties => {
  if (typeof object !== "object" || object === null) {
    throw new Error("malformed or missing object");
  }
  for (const key in object) {
    if (!["name", "email", "phone", "dateOfBirth", "gender", "address", "specialistId"].includes(key)) {
      throw new Error("invalid property");
    }
  }
  return true;
};

export const isPatientInput = (object: unknown): object is Patient => {
  if (typeof object !== "object" || object === null) {
    throw new Error("malformed or missing object");
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
    throw new Error("malformed or missing object");
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

export const appointmentProperties = (object: unknown): object is AppointmentProperties => {
  if (typeof object !== "object" || object === null) {
    throw new Error("malformed or missing object");
  }
  for (const key in object) {
    if (!["patientId", "specialistId", "date", "start", "end", "type", "description"].includes(key)) {
      throw new Error("invalid property");
    }
  }
  return true;
};

export const isAppointmentInput = (object: unknown): object is Appointment => {
  if (typeof object !== "object" || object === null) {
    throw new Error("malformed or missing object");
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
    throw new Error("malformed or missing object");
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
