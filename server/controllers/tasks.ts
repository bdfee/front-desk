import { Router } from "express";
import * as taskService from "../services/task";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const tasks = await taskService.getAll();
    res.json(tasks);
  } catch (error: unknown) {
    if (error instanceof Error) {
      error.message = "Error getting tasks: " + error;
      next(error);
    }
  }
});

router.post("/", async (req, res, next) => {
  try {
    const task = await taskService.create(req.body);
    res.json(task);
  } catch (error: unknown) {
    if (error instanceof Error) {
      error.message = "Error posting task: " + error;
      next(error);
    }
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const task = await taskService.getOneById(+req.params.id);
    res.json(task);
  } catch (error) {
    if (error instanceof Error) {
      error.message = "Error getting task: " + error;
      next(error);
    }
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updatedTask = await taskService.updateOneById(+req.params.id, req.body);
    res.json(updatedTask);
  } catch (error) {
    if (error instanceof Error) {
      error.message = "Error updating task: " + error;
      next(error);
    }
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await taskService.deleteOneById(+req.params.id);
    res.status(204).end();
  } catch (error) {
    if (error instanceof Error) {
      error.message = "Error deleting task: " + error;
      next(error);
    }
  }
});

export default router;
