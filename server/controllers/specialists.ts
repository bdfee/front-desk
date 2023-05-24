/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Router } from "express";
import { Specialist } from "../models";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const specialists = await Specialist.findAll();
    res.json(specialists);
  } catch (error) {
    console.log("Error getting specialists: ", error);
    res.status(500).json({ error: "Error getting specialists" });
  }
});

router.post("/", async (req, res) => {
  try {
    const specialist = await Specialist.create(req.body);
    res.json(specialist);
  } catch (error) {
    console.log("Error creating specialists: ", error);
    res.status(500).json({ error: "Error creating specialists" });
  }
});

export default router;
