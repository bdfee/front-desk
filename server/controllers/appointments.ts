import { Router } from "express";
import Appointment from "../models/appointment";
const router = Router();

router.get("/", async (_req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.json(appointments);
  } catch (error) {
    console.log("Error getting appointments:", error);
    res.status(500).json({ error: "Error getting appointments" });
  }
});

export default router;
