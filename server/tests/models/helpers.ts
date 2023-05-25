import { Specialist, Patient } from "../../models";

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
