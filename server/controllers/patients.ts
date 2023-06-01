import { Router } from "express";
import * as patientService from "../services/patient";
const router = Router();

router.get("/", async (_req, res) => {
  try {
    const patients = await patientService.getAll();
    res.json(patients);
  } catch (error) {
    console.log("Error getting patients:", error);
    res.status(400).json({ error: "Error getting patients: " + error });
  }
});

router.post("/", async (req, res) => {
  try {
    const patient = await patientService.create(req.body);
    res.json(patient);
  } catch (error) {
    console.log("Error posting patient:", error);
    res.status(400).json({ error: "Error posting patient: " + error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const patient = await patientService.getOneById(+req.params.id);
    res.json(patient);
  } catch (error) {
    console.log("Error getting patient:", error);
    res.status(400).json({ error: "Error getting patient: " + error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedPatient = await patientService.updateOneById(+req.params.id, req.body);
    res.json(updatedPatient);
  } catch (error) {
    console.log("Error updating patient: ", error);
    res.status(400).json({ error: "Error updating patient: " + error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await patientService.deleteOneById(+req.params.id);
    res.status(204).end();
  } catch (error) {
    console.log("Error deleting patient: ", error);
    res.status(400).json({ error: "Error deleting patient: " + error });
  }
});

export default router;
