import { Request, Router } from "express";
import { isDate, isString } from "../typeUtils";
import * as appointmentService from "../services/appointment";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const appointments = await appointmentService.getAll();
    res.json(appointments);
  } catch (error: unknown) {
    if (error instanceof Error) {
      error.message = "Error getting appointments: " + error;
      next(error);
    }
  }
});

router.post("/", async (req, res, next) => {
  try {
    const appointment = await appointmentService.create(req.body);
    res.json(appointment);
  } catch (error) {
    if (error instanceof Error) {
      error.message = "Error posting appointment: " + error;
      next(error);
    }
  }
});

router.get("/entries", async (req: Request, res, next) => {
  const { startDate, endDate } = req.query;
  try {
    if (!isString(startDate) || !isString(endDate) || !isDate(startDate) || !isDate(endDate)) {
      throw new Error("malformed date");
    }
    const appointmentList = await appointmentService.getAllByDateframe(startDate.toString(), endDate.toString());
    res.json(appointmentList);
  } catch (error) {
    if (error instanceof Error) {
      error.message = "Error getting appointments by dateframe: " + error;
      next(error);
    }
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const appointment = await appointmentService.getOneById(+req.params.id);
    res.json(appointment);
  } catch (error) {
    if (error instanceof Error) {
      error.message = "Error getting appointment: " + error;
      next(error);
    }
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updatedAppointment = await appointmentService.updateOneById(+req.params.id, req.body);
    res.json(updatedAppointment);
  } catch (error) {
    if (error instanceof Error) {
      error.message = "Error updating appointment: " + error;
      next(error);
    }
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await appointmentService.deleteOneById(+req.params.id);
    res.status(204).end();
  } catch (error) {
    if (error instanceof Error) {
      error.message = "Error deleting appointment: " + error;
      next(error);
    }
  }
});

export default router;
