import { InferAttributes } from "sequelize";
import { Appointment as AppointmentModel, Patient as PatientModel, Specialist as SpecialistModel } from "./models";

export type Patient = InferAttributes<PatientModel>;

export type PatientProperties = Patient & {
  name?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  specialistId?: number;
};

export type Specialist = InferAttributes<SpecialistModel>;

export type SpecialistProperties = Specialist & {
  name?: string;
  speciality?: string;
};

export type Appointment = InferAttributes<AppointmentModel>;

export type AppointmentProperties = Appointment & {
  patientId?: number;
  specialistId?: number;
  date?: string;
  start?: string;
  end?: string;
  type?: string;
  description?: string;
};

// association inclusions and exclusions
export type PatientDetail = Omit<Patient, "specialistId"> & {
  specialist: Omit<Specialist, "specialistId" | "speciality">;
};

export type AppointmentDetail = Omit<Appointment, "specialistId" | "patientId"> & {
  specialist: Omit<Specialist, "specialistId" | "speciality">;
  patient: Omit<Patient, "patientId" | "email" | "phone" | "dateOfBirth" | "gender" | "address" | "specialistId">;
};
