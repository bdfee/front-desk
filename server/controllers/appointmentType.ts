import { Router } from "express";
import { AppointmentType } from "../models";

const router = Router();

router.get("/", async (_rep, res) => {
  try {
    const appointmentTypes = await AppointmentType.findAll();
    res.json(appointmentTypes);
  } catch (error) {
    console.log("Error getting appointment types: " + error);
    res.status(500).json({ error: "Error getting appointments" });
  }
});

export default router;
