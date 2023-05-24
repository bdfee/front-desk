/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Router } from "express";
import { Patient } from "../models";
const router = Router();

router.get("/", async (_req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (error) {
    console.log("Error getting patients:", error);
    res.status(500).json({ error: "Error getting patients" });
  }
});

router.post("/", async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.json(patient);
  } catch (error) {
    console.log("Error getting patient:", error);
    res.status(500).json({ error: "Error getting patient" });
  }
});

export default router;
