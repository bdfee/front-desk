import { Router } from "express";
import * as loginService from "../services/login";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const authenticatedUser = await loginService.login(req.body);
    res.status(200).send(authenticatedUser);
  } catch (error) {
    if (error instanceof Error) {
      error.message = "Error logging in: " + error;
      next(error);
    }
  }
});
