import { Router } from "express";
import * as specialistService from "../services/specialist";

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
