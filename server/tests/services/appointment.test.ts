import { Appointment } from "../../models";
import { sequelize } from "../../utils/connectToDb";
import { createTestPatientAndSpecialist, createTestSPA, createTestSpecificSPA, dropAllTables } from "../helpers/models";
import { getAll, getOneById, create, updateOneById, deleteOneById } from "../../services/appointment";
import { expectAppointment, expectAppointmentInformation } from "../helpers/shape";
import { AppointmentInformationAttributes, AppointmentAttributes } from "../../types";

beforeEach(async () => await dropAllTables());

describe("returned shape from appointmentService", () => {
  test("getAll()", async () => {
    await createTestSPA();
    const [appointment] = await getAll();

    expectAppointmentInformation(appointment as AppointmentInformationAttributes);
  });

  test("getOneById()", async () => {
    await createTestSPA();
    expectAppointmentInformation((await getOneById(1)) as AppointmentInformationAttributes);
  });

  test("create()", async () => {
    const { specialistId, patientId } = await createTestPatientAndSpecialist();

    expectAppointment(
      (await create({
        date: "2020-02-02",
        start: "09:00:00",
        end: "10:00:00",
        type: "intake",
        description: "Appointment description",
        specialistId,
        patientId,
      })) as AppointmentAttributes
    );
  });

  test("updateOneById()", async () => {
    await createTestSPA();
    const update = {
      date: "2020-03-03",
      description: "updated description",
    };
    expectAppointmentInformation((await updateOneById(1, update)) as AppointmentInformationAttributes);
  });
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
      error instanceof Error && expect(error.message).toBe("no matching appointment id found");
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
      error instanceof Error && expect(error.message).toBe("malformed or invalid value on appointment input");
    }
    expect(await Appointment.count()).toBe(0);
  });
});

describe("deleteOneById()", () => {
  test("deletes appointment by ID", async () => {
    const { appointmentId } = await createTestSPA();

    expect(await Appointment.count()).toBe(1);
    await deleteOneById(appointmentId);

    expect(await Appointment.count()).toBe(0);
  });

  test("no id match returns expected error message", async () => {
    await createTestSPA();
    expect(await Appointment.count()).toBe(1);

    try {
      await deleteOneById(2);
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("no matching appointment id found");
    }

    expect(await Appointment.count()).toBe(1);
  });
});

describe("updateOneById()", () => {
  test("updates one appointment by id", async () => {
    const { appointmentId } = await createTestSPA();

    await updateOneById(appointmentId, { date: "2020-03-03", description: "updated description" });

    expect(await Appointment.count()).toBe(1);

    const updatedAppointment = await Appointment.findByPk(appointmentId);

    expect(updatedAppointment?.date).toEqual("2020-03-03");
    expect(updatedAppointment?.description).toEqual("updated description");
    expect(await Appointment.count()).toBe(1);
  });

  test("no id match returns expected error message", async () => {
    await createTestSPA();
    expect(await Appointment.count()).toBe(1);

    try {
      await updateOneById(2, { description: "updated description" });
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("no matching appointment id found");
    }
    expect(await Appointment.count()).toBe(1);
  });

  test("invalid property returns expected error message", async () => {
    await createTestSPA();
    expect(await Appointment.count()).toBe(1);

    try {
      await updateOneById(1, { invalid: "invalid update" });
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("invalid property");
    }
  });
});

afterAll(async () => await sequelize.close());
