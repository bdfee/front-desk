import { Router } from "express";
import { Calendar } from "../models";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const calendar = await Calendar.findAll();
    res.json(calendar);
  } catch (error) {
    console.log("Error getting calendar: " + error);
    res.status(500).json({ error: "Error getting calendar" });
  }
});

export default router;
