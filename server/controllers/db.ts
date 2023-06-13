import { Router } from "express";
import { isTestDb, dropTables } from "../services/db";

const router = Router();

router.get("/is-test", (_req, res, next) => {
  try {
    res.send(isTestDb());
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/drop-all-tables", async (_req, res, next) => {
  try {
    res.send(await dropTables());
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
