import { Appointment } from "../../models";
import { sequelize } from "../../utils/connectToDb";
import { createTestPatientAndSpecialist, createTestSPA, createTestSpecificSPA, dropAllTables } from "../helpers/models";
import { getAll, getOneById, create } from "../../services/appointment";
import { expectAppointment, expectAppointmentInformation } from "../helpers/shape";
import { AppointmentInformationAttributes, AppointmentAttributes } from "../../types";

beforeEach(async () => await dropAllTables());

describe("returned shape", () => {
  test("getAll()", async () => {
    await createTestSPA();
    const [appointment] = await getAll();

    expectAppointmentInformation(appointment as AppointmentInformationAttributes);
  });

  test("getOneById()", async () => {
    await createTestSPA();
    const appointment = await getOneById(1);
    expect(await Appointment.count()).toBe(1);

    expectAppointmentInformation(appointment as AppointmentInformationAttributes);
  });

  test("create()", async () => {
    const { specialistId, patientId } = await createTestPatientAndSpecialist();
    const appointment = await create({
      date: "2020-02-02",
      start: "09:00:00",
      end: "10:00:00",
      type: "intake",
      description: "Appointment description",
      specialistId,
      patientId,
    });

    expectAppointment(appointment as AppointmentAttributes);
  });

  //   test("updateOneById()", async () => {
  //     //
  //   });
});

describe("getAll()", () => {
  test("returns all appointments", async () => {
    expect(await Appointment.count()).toBe(0);
    const { patientId, specialistId } = await createTestSPA();
    await createTestSpecificSPA(patientId, specialistId);
    await createTestSpecificSPA(patientId, specialistId);
    expect(await Appointment.count()).toBe(3);

    expect(await getAll()).toHaveLength(3);
  });
  test("no appointments returns an empty array", async () => {
    expect(await Appointment.count()).toBe(0);
    expect(await getAll()).toHaveLength(0);
  });
});

describe("getOneById()", () => {
  test("returns appointment by id", async () => {
    const { appointmentId } = await createTestSPA();
    const appointment = await getOneById(appointmentId);
    expect(await Appointment.count()).toBe(1);
    expect(appointment?.appointmentId).toBe(appointmentId);
    //
  });
  test("no id match returns expected error message", async () => {
    await createTestSPA();
    expect(await Appointment.count()).toBe(1);

    try {
      await getOneById(2);
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("No matching appointment id found");
    }

    expect(await Appointment.count()).toBe(1);
  });
});

describe("create()", () => {
  //
  test("creates appointment", async () => {
    const { patientId, specialistId } = await createTestPatientAndSpecialist();

    expect(await Appointment.count()).toBe(0);

    await Appointment.create({
      date: "2020-02-02",
      start: "09:00:00",
      end: "10:00:00",
      type: "intake",
      description: "Appointment description",
      specialistId,
      patientId,
    });
    expect(await Appointment.count()).toBe(1);
  });
  test("no creation returns expected message", async () => {
    expect(await Appointment.count()).toBe(0);
    try {
      await create({
        date: "2020-02-02",
        start: "09:00:00",
        end: "10:00:00",
        type: "intake",
        description: "Appointment description",
      });
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("Malformed or missing appointment input");
    }
    expect(await Appointment.count()).toBe(0);
  });
});

// describe("deleteOneById()", () => {
//   //
//   test("deletes patient by ID", async () => {
//     //
//   });

//   test("no id match returns expected error message", async () => {
//     //
//   });
// });

// describe("updateOneById()", () => {
//   //
//   test("updates one patient by id", async () => {
//     //
//   });
//   test("no id match returns expected error message", async () => {
//     //
//   });
// });

afterAll(async () => await sequelize.close());
