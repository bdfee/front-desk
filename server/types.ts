import { InferAttributes } from "sequelize";
import { Appointment, Patient, Specialist } from "./models";

export type PatientAttributes = InferAttributes<Patient>;
export type PatientInformationAttributes = Omit<PatientAttributes, "specialistId"> & {
  specialist: object;
};

export type SpecialistInformationAttributes = InferAttributes<Specialist>;

export type AppointmentAttributes = InferAttributes<Appointment>;
export type AppointmentInformationAttributes = Omit<AppointmentAttributes, "specialistId" | "patientId"> & {
  specialist: object;
  patient: object;
};
