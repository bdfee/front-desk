import { InferAttributes } from "sequelize";
import { Appointment, Patient, Specialist } from "./models";

export type PatientAttributes = InferAttributes<Patient>;

export type PatientInformationAttributes = Omit<PatientAttributes, "specialistId"> & {
  specialist: object;
};

export type PatientProperties = InferAttributes<Patient> & {
  name?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  specialistId?: number;
};

export type SpecialistInformationAttributes = InferAttributes<Specialist>;

export type SpecialistProperties = InferAttributes<Specialist> & {
  name?: string;
  speciality?: string;
};

export type AppointmentProperties = InferAttributes<Appointment> & {
  patientId?: number;
  specialistId?: number;
  date?: string;
  start?: string;
  end?: string;
  type?: string;
  description?: string;
};

export type AppointmentAttributes = InferAttributes<Appointment>;

export type AppointmentInformationAttributes = Omit<AppointmentAttributes, "specialistId" | "patientId"> & {
  specialist: object;
  patient: object;
};
