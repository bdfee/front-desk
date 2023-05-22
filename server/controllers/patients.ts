import { Router } from "express";
import Patient from "../models/patient";
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

export default router;
