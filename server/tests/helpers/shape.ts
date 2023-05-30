/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  PatientAttributes,
  PatientInformationAttributes,
  SpecialistInformationAttributes,
  AppointmentAttributes,
  AppointmentInformationAttributes,
} from "../../types";

export const expectPatient = (patient: PatientAttributes) => {
  expect(patient).toMatchObject<PatientAttributes>({
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

export const expectPatientInformation = (patient: PatientInformationAttributes) => {
  expect(patient).toMatchObject<PatientInformationAttributes>({
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

export const expectSpecialistInformation = (specialist: SpecialistInformationAttributes) => {
  expect(specialist).toMatchObject<SpecialistInformationAttributes>({
    specialistId: expect.any(Number),
    name: expect.any(String),
    speciality: expect.any(String),
  });
};

export const expectAppointment = (appointment: AppointmentAttributes) => {
  expect(appointment).toMatchObject<AppointmentAttributes>({
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

export const expectAppointmentInformation = (appointment: AppointmentInformationAttributes) => {
  expect(appointment).toMatchObject<AppointmentInformationAttributes>({
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
