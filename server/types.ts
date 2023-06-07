import { InferAttributes } from "sequelize";
import {
  Appointment as AppointmentModel,
  Patient as PatientModel,
  Specialist as SpecialistModel,
  User as UserModel,
} from "./models";

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

export type User = InferAttributes<UserModel>;

export type UserLogin = Omit<User, "name">;

export type UserForToken = Omit<User, "password">;

export type AuthenticatedUser = Omit<User, "password"> & {
  token: string;
};

export type UserProperties = User & {
  name?: string;
  username?: string;
  password?: string;
};

// association inclusions and exclusions
export type PatientDetail = Omit<Patient, "specialistId"> & {
  specialist: Omit<Specialist, "specialistId" | "speciality">;
};

export type AppointmentDetail = Omit<Appointment, "specialistId" | "patientId"> & {
  specialist: Omit<Specialist, "specialistId" | "speciality">;
  patient: Omit<Patient, "patientId" | "email" | "phone" | "dateOfBirth" | "gender" | "address" | "specialistId">;
};
