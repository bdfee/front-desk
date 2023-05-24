/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Router } from "express";
import { Appointment } from "../models";
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

router.post("/", async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.json(appointment);
  } catch (error) {
    console.log("Error creating appointments", error);
    res.status(500).json({ error: "Error getting appointments" });
  }
});

export default router;
