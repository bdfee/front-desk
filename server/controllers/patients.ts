import { Router } from "express";
import * as patientService from "../services/patient";
import * as appointmentService from "../services/appointment";
import * as taskService from "../services/task";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const patients = await patientService.getAll();
    res.json(patients);
  } catch (error) {
    if (error instanceof Error) {
      error.message = "Error getting patients: " + error;
      next(error);
    }
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { patientId } = await patientService.create(req.body);
    const patient = await patientService.getOneById(patientId);
    res.json(patient);
  } catch (error) {
    if (error instanceof Error) {
      error.message = "Error posting patient: " + error;
      next(error);
    }
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const patient = await patientService.getOneById(+req.params.id);
    res.json(patient);
  } catch (error) {
    if (error instanceof Error) {
      error.message = "Error getting patient: " + error;
      next(error);
    }
  }
});

router.get("/:id/appointments", async (req, res, next) => {
  try {
    const appointmentList = await appointmentService.getAllByPatient(+req.params.id);
    res.json(appointmentList);
  } catch (error) {
    if (error instanceof Error) {
      error.message = "Error getting patient appointments: " + error;
      next(error);
    }
  }
});

router.get("/:id/tasks", async (req, res, next) => {
  try {
    const tasks = await taskService.getAllByPatient(+req.params.id);
    res.json(tasks);
  } catch (error) {
    if (error instanceof Error) {
      error.message = "Error getting patient tasks: " + error;
      next(error);
    }
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { patientId } = await patientService.updateOneById(+req.params.id, req.body);
    const patient = await patientService.getOneById(patientId);
    res.json(patient);
  } catch (error) {
    if (error instanceof Error) {
      error.message = "Error updating patient: " + error;
      next(error);
    }
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await patientService.deleteOneById(+req.params.id);
    res.status(204).end();
  } catch (error) {
    if (error instanceof Error) {
      error.message = "Error deleting patient: " + error;
      next(error);
    }
  }
});

export default router;
