import { Specialist, Patient, Appointment, User } from "../../models";
import { sequelize } from "../../utils/connectToDb";
// DB helpers
export const createTestSpecialist = async () => {
  return Specialist.create({
    name: "test specialist",
    speciality: "testing",
  });
};

export const createTestPatient = async (specialistId: number) => {
  return Patient.create({
    name: "test patient",
    email: "email@test.com",
    phone: "1231231234",
    dateOfBirth: "2020-02-02",
    gender: "male",
    address: "123 street city state zip",
    specialistId: specialistId,
  });
};

export const createTestPatientAndSpecialist = async () => {
  const { specialistId } = await createTestSpecialist();

  return Patient.create({
    name: "test patient",
    email: "email@test.com",
    phone: "1231231234",
    dateOfBirth: "2020-02-02",
    gender: "male",
    address: "123 street city state zip",
    specialistId: specialistId,
  });
};

export const createTestSPA = async () => {
  const { specialistId, patientId } = await createTestPatientAndSpecialist();
  return Appointment.create({
    date: "2020-02-02",
    start: "09:00:00",
    end: "10:00:00",
    type: "intake",
    description: "Appointment description",
    specialistId,
    patientId,
  });
};

export const createTestSpecificSPA = async (patientId: number, specialistId: number) => {
  return Appointment.create({
    date: "2020-02-02",
    start: "09:00:00",
    end: "10:00:00",
    type: "intake",
    description: "Appointment description",
    specialistId,
    patientId,
  });
};

export const createTestUser = async () => {
  return User.create({
    name: "test user",
    username: "testusername",
    password: "secretpassword",
  });
};

export const createTestSpecificUser = async (username: string) => {
  return User.create({
    username,
    name: "test user",
    password: "secretpassword",
  });
};

export const dropAllTables = async () => {
  await Specialist.drop({ cascade: true });
  await Patient.drop({ cascade: true });
  await Appointment.drop({ cascade: true });
  await sequelize.sync();
};

export const dropUserTable = async () => {
  await User.drop({ cascade: true });
  await sequelize.sync();
};
