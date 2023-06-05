import { Appointment, AppointmentDetail } from "../../types";
import { sequelize } from "../../utils/connectToDb";
import {
  getAll,
  getOneById,
  create,
  updateOneById,
  deleteOneById,
  getAllBySpecialist,
  getAllByPatient,
  getAllByDateframe,
} from "../../services/appointment";
import { Appointment as AppointmentModel } from "../../models";
import { createTestPatientAndSpecialist, createTestSPA, createTestSpecificSPA, dropAllTables } from "../helpers/models";
import { expectAppointment, expectAppointmentDetail } from "../helpers/shape";

beforeEach(async () => await dropAllTables());

describe("returned shape from appointmentService", () => {
  test("getAll()", async () => {
    await createTestSPA();
    const [appointment] = await getAll();

    expectAppointmentDetail(appointment as AppointmentDetail);
  });

  test("getOneById()", async () => {
    await createTestSPA();
    expectAppointmentDetail((await getOneById(1)) as AppointmentDetail);
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
      })) as Appointment
    );
  });

  test("getAllBySpecialist", async () => {
    const { specialistId } = await createTestSPA();
    const appointmentList = await getAllBySpecialist(specialistId);
    expectAppointment(appointmentList[0] as Appointment);
  });

  test("getAllByPatient", async () => {
    const { patientId } = await createTestSPA();
    const appointmentList = await getAllByPatient(patientId);
    expectAppointment(appointmentList[0] as Appointment);
  });

  test("getAllByTimeframe", async () => {
    // 2020-02-02
    await createTestSPA();

    const appointmentList = await getAllByDateframe("2020-01-01", "2020-10-10");
    expectAppointment(appointmentList[0] as Appointment);
  });

  test("updateOneById()", async () => {
    await createTestSPA();
    const update = {
      date: "2020-03-03",
      description: "updated description",
    };
    expectAppointmentDetail((await updateOneById(1, update)) as AppointmentDetail);
  });
});

describe("getAll()", () => {
  test("returns all appointments", async () => {
    expect(await AppointmentModel.count()).toBe(0);
    const { patientId, specialistId } = await createTestSPA();
    await createTestSpecificSPA(patientId, specialistId);
    await createTestSpecificSPA(patientId, specialistId);
    expect(await AppointmentModel.count()).toBe(3);

    expect(await getAll()).toHaveLength(3);
  });
  test("no appointments returns an empty array", async () => {
    expect(await AppointmentModel.count()).toBe(0);
    expect(await getAll()).toHaveLength(0);
  });
});

describe("getOneById()", () => {
  test("returns appointment by id", async () => {
    const { appointmentId } = await createTestSPA();
    const appointment = await getOneById(appointmentId);
    expect(await AppointmentModel.count()).toBe(1);
    expect(appointment?.appointmentId).toBe(appointmentId);
    //
  });
  test("no id match returns expected error message", async () => {
    await createTestSPA();
    expect(await AppointmentModel.count()).toBe(1);

    try {
      await getOneById(2);
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("no matching appointment id found");
    }

    expect(await AppointmentModel.count()).toBe(1);
  });
});

describe("create()", () => {
  //
  test("creates appointment", async () => {
    const { patientId, specialistId } = await createTestPatientAndSpecialist();

    expect(await AppointmentModel.count()).toBe(0);

    await AppointmentModel.create({
      date: "2020-02-02",
      start: "09:00:00",
      end: "10:00:00",
      type: "intake",
      description: "Appointment description",
      specialistId,
      patientId,
    });
    expect(await AppointmentModel.count()).toBe(1);
  });
  test("no creation returns expected message", async () => {
    expect(await AppointmentModel.count()).toBe(0);
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
    expect(await AppointmentModel.count()).toBe(0);
  });
});

describe("deleteOneById()", () => {
  test("deletes appointment by ID", async () => {
    const { appointmentId } = await createTestSPA();

    expect(await AppointmentModel.count()).toBe(1);
    await deleteOneById(appointmentId);

    expect(await AppointmentModel.count()).toBe(0);
  });

  test("no id match returns expected error message", async () => {
    await createTestSPA();
    expect(await AppointmentModel.count()).toBe(1);

    try {
      await deleteOneById(2);
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("no matching appointment id found");
    }

    expect(await AppointmentModel.count()).toBe(1);
  });
});

describe("updateOneById()", () => {
  test("updates one appointment by id", async () => {
    const { appointmentId } = await createTestSPA();

    await updateOneById(appointmentId, { date: "2020-03-03", description: "updated description" });

    expect(await AppointmentModel.count()).toBe(1);

    const updatedAppointment = await AppointmentModel.findByPk(appointmentId);

    expect(updatedAppointment?.date).toEqual("2020-03-03");
    expect(updatedAppointment?.description).toEqual("updated description");
    expect(await AppointmentModel.count()).toBe(1);
  });

  test("no id match returns expected error message", async () => {
    await createTestSPA();
    expect(await AppointmentModel.count()).toBe(1);

    try {
      await updateOneById(2, { description: "updated description" });
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("no matching appointment id found");
    }
    expect(await AppointmentModel.count()).toBe(1);
  });

  test("invalid property returns expected error message", async () => {
    await createTestSPA();
    expect(await AppointmentModel.count()).toBe(1);

    try {
      await updateOneById(1, { invalid: "invalid update" });
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("invalid property on appointment input");
    }
  });
});

describe("getAllBySpecialist", () => {
  test("returns appointments by specialist", async () => {
    await createTestSPA();

    const { specialistId, patientId } = await createTestSPA();
    await createTestSpecificSPA(specialistId, patientId);

    const appointmentList = await getAllBySpecialist(specialistId);

    expect(appointmentList).toHaveLength(2);
  });

  test("returns empty array if no appointments", async () => {
    const { specialistId } = await createTestPatientAndSpecialist();
    const appointmentList = await getAllBySpecialist(specialistId);
    expect(appointmentList).toHaveLength(0);
  });
});

describe("getAllByPatient", () => {
  test("returns appointments by patient", async () => {
    await createTestSPA();

    const { specialistId, patientId } = await createTestSPA();
    await createTestSpecificSPA(specialistId, patientId);

    const appointmentList = await getAllByPatient(patientId);

    expect(appointmentList).toHaveLength(2);
  });
  test("returns empty array if no appointments", async () => {
    const { patientId } = await createTestPatientAndSpecialist();
    const appointmentList = await getAllByPatient(patientId);
    expect(appointmentList).toHaveLength(0);
  });
});

describe("getAllByTimeframe", () => {
  test("returns appointments by timeframe", async () => {
    const { patientId, specialistId } = await createTestSPA();
    await createTestSpecificSPA(patientId, specialistId, "2021-02-02");
    await createTestSpecificSPA(patientId, specialistId, "2022-02-02");

    const appointmentList = await getAllByDateframe("2021-01-01", "2021-11-31");
    expect(appointmentList).toHaveLength(1);
  });
  test("returns empty array if no appointments", async () => {
    //2020-02-02
    await createTestSPA();
    const appointmentList = await getAllByDateframe("2021-01-01", "2021-11-31");
    expect(appointmentList).toHaveLength(0);
  });
  test("invalid date string returns expected error message", async () => {
    await createTestSPA();
    try {
      await getAllByDateframe("2021-12-01", "2022-11-31");
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("invalid date on dateframe");
    }
  });
  test("invalid dateframe returns expected error message", async () => {
    await createTestSPA();
    try {
      await getAllByDateframe("2021-02-02", "2020-02-02");
    } catch (error) {
      error instanceof Error && expect(error.message).toBe("start date must come before end date");
    }
  });
});

afterAll(async () => await sequelize.close());
