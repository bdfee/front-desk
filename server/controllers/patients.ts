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
    res.status(400).json({ error: "Error getting patients: " + error });
  }
});

router.post("/", async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.json(patient);
  } catch (error) {
    console.log("Error posting patient:", error);
    res.status(400).json({ error: "Error posting patient: " + error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    res.json(patient);
  } catch (error) {
    console.log("Error posting patient:", error);
    res.status(400).json({ error: "Error posting patient: " + error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    const updatedPatient = await patient?.update({ ...patient, ...req.body });
    res.json(updatedPatient);
  } catch (error) {
    console.log("Error updating patient: ", error);
    res.status(400).json({ error: "Error updating patient: " + error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Patient.destroy({
      where: {
        patientId: req.params.id,
      },
    });
    res.status(204).end();
  } catch (error) {
    console.log("Error deleting patient: ", error);
    res.status(400).json({ error: "Error deleting patient: " + error });
  }
});

export default router;
