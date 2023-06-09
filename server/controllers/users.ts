import { Router } from "express";
import * as userService from "../services/user";
import * as taskService from "../services/task";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (error) {
    if (error instanceof Error) {
      error.message = "Error getting users: " + error;
      next(error);
    }
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = await userService.create(req.body);
    res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      error.message = "Error creating user: " + error;
      next(error);
    }
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await userService.getOneById(+req.params.id);
    res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      error.message = "Error getting user: " + error;
      next(error);
    }
  }
});

router.get("/:id/tasks", async (req, res, next) => {
  try {
    const tasks = await taskService.getAllByUser(+req.params.id);
    res.json(tasks);
  } catch (error) {
    if (error instanceof Error) {
      error.message = "Error getting user tasks: " + error;
      next(error);
    }
  }
});

export default router;
