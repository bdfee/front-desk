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
    res.status(400).json({ error: "Error getting appointments" });
  }
});

router.post("/", async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.json(appointment);
  } catch (error) {
    console.log("Error creating appointments", error);
    res.status(400).json({ error: "Error getting appointments" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    res.json(appointment);
  } catch (error) {
    console.log("Error getting appointment: ", error);
    res.status(400).json({ error: "Error getting appointment: " + error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    const updatedAppointment = await appointment?.update({ ...appointment, ...req.body });
    res.json(updatedAppointment);
  } catch (error) {
    console.log("Error updating appointment: ", error);
    res.status(400).json({ error: "Error updating appointment: " + error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Appointment.destroy({
      where: {
        appointmentId: req.params.id,
      },
    });
    res.status(204).end();
  } catch (error) {
    console.log("Error deleting appointment: ", error);
    res.status(400).json({ error: "Error deleting appointment: " + error });
  }
});

export default router;
