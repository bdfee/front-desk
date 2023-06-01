/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// we assign unsafely to allow expect to test the value
// we assert the object shape returned by the serivce call
// TODO rename and organize these when business logic is flushed out in services
import { Patient, PatientDetail, Specialist, Appointment, AppointmentDetail } from "../../types";

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
