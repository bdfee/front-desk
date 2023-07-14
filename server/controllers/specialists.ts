import { Router } from "express";
import * as specialistService from "../services/specialist";
import * as patientService from "../services/patient";
import * as appointmentService from "../services/appointment";
import * as taskService from "../services/task";
import { Error } from "sequelize";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const specialists = await specialistService.getAll();
    res.json(specialists);
  } catch (error) {
    if (error instanceof Error) {
      error.message = "Error getting specialists: " + error;
      next(error);
    }
  }
});

router.post("/", async (req, res, next) => {
  try {
    const specialist = await specialistService.create(req.body);
    res.json(specialist);
  } catch (error) {
    if (error instanceof Error) {
      error.message = "Error posting specialist: " + error;
      next(error);
    }
  }
});

router.get("/table-data", async (_req, res, next) => {
  try {
    const tableData = await specialistService.getTableData();
    res.json(tableData);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const specialist = await specialistService.getOneById(+req.params.id);
    res.json(specialist);
  } catch (error) {
    if (error instanceof Error) {
      error.message = "Error getting specialist: " + error;
      next(error);
    }
  }
});

router.get("/:id/appointments", async (req, res, next) => {
  try {
    const appointmentList = await appointmentService.getAllBySpecialist(+req.params.id);
    res.json(appointmentList);
  } catch (error) {
    if (error instanceof Error) {
      error.message = "Error getting specialist appointments: " + error;
      next(error);
    }
  }
});

router.get("/:id/tasks", async (req, res, next) => {
  try {
    const tasks = await taskService.getAllBySpecialist(+req.params.id);
    res.json(tasks);
  } catch (error) {
    if (error instanceof Error) {
      error.message = "Error getting specialist tasks: " + error;
      next(error);
    }
  }
});

router.get("/:id/patients", async (req, res, next) => {
  try {
    const patientList = await patientService.getAllBySpecialist(+req.params.id);
    res.json(patientList);
  } catch (error) {
    if (error instanceof Error) {
      error.message = "Error getting patient list: " + error;
      next(error);
    }
  }
});

router.get("/:id/patients/count", async (req, res, next) => {
  try {
    const patientCount = await patientService.getCountBySpecialist(+req.params.id);
    res.json(patientCount);
  } catch (error) {
    if (error instanceof Error) {
      error.message = "Error getting patient count: " + error;
      next(error);
    }
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updatedSpecialist = await specialistService.updateOneById(+req.params.id, req.body);
    res.json(updatedSpecialist);
  } catch (error) {
    if (error instanceof Error) {
      error.message = "Error updating specialist: " + error;
      next(error);
    }
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await specialistService.deleteOneById(+req.params.id);
    res.status(204).end();
  } catch (error) {
    if (error instanceof Error) {
      error.message = "Error deleting specialist: " + error;
      next(error);
    }
  }
});

export default router;
