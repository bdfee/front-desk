/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {
  Patient,
  PatientDetail,
  Specialist,
  Appointment,
  AppointmentDetail,
  User,
  AuthenticatedUser,
} from "../../types";

export const expectSpecialist = (specialist: Specialist) => {
  expect(specialist).toMatchObject<Specialist>({
    specialistId: expect.any(Number),
    name: expect.any(String),
    speciality: expect.any(String),
  });
};

export const expectPatient = (patient: Patient) => {
  expect(patient).toMatchObject<Patient>({
    patientId: expect.any(Number),
    name: expect.any(String),
    email: expect.any(String),
    phone: expect.any(String),
    dateOfBirth: expect.any(String),
    gender: expect.any(String),
    address: expect.any(String),
    specialistId: expect.any(Number),
  });
};

export const expectPatientDetail = (patient: PatientDetail) => {
  expect(patient).toMatchObject<PatientDetail>({
    patientId: expect.any(Number),
    name: expect.any(String),
    email: expect.any(String),
    phone: expect.any(String),
    dateOfBirth: expect.any(String),
    gender: expect.any(String),
    address: expect.any(String),
    specialist: {
      name: expect.any(String),
    },
  });
};

export const expectAppointment = (appointment: Appointment) => {
  expect(appointment).toMatchObject<Appointment>({
    appointmentId: expect.any(Number),
    date: expect.any(String),
    start: expect.any(String),
    end: expect.any(String),
    type: expect.any(String),
    description: expect.any(String),
    patientId: expect.any(Number),
    specialistId: expect.any(Number),
  });
};

export const expectAppointmentDetail = (appointment: AppointmentDetail) => {
  expect(appointment).toMatchObject<AppointmentDetail>({
    appointmentId: expect.any(Number),
    date: expect.any(String),
    start: expect.any(String),
    end: expect.any(String),
    type: expect.any(String),
    description: expect.any(String),
    specialist: {
      name: expect.any(String),
    },
    patient: {
      name: expect.any(String),
    },
  });
};

export const expectUser = (user: User) => {
  expect(user).toMatchObject<User>({
    id: expect.any(Number),
    name: expect.any(String),
    username: expect.any(String),
    password: expect.any(String),
  });
};

export const expectAuthenticatedUser = (user: AuthenticatedUser) => {
  expect(user).toMatchObject<AuthenticatedUser>({
    id: expect.any(Number),
    name: expect.any(String),
    username: expect.any(String),
    token: expect.any(String),
  });
};
