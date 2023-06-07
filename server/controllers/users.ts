import { Router } from "express";
import * as userService from "../services/user";

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
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    next(error);
  }
});
