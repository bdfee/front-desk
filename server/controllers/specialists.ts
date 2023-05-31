import { Router } from "express";
import { Specialist } from "../models";
import * as specialistService from "../services/specialist";
import { isSpecialistInput } from "../typeUtils";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const specialists = await specialistService.getAll();
    res.json(specialists);
  } catch (error) {
    console.error("Error getting specialists: ", error);
    res.status(400).json({ error: "Error getting specialists: " + error });
  }
});

router.post("/", async (req, res) => {
  try {
    if (isSpecialistInput(req.body)) {
      const specialist = await Specialist.create(req.body);
      res.json(specialist);
    }
  } catch (error) {
    console.error("Error creating specialists: ", error);
    res.status(400).json({ error: "Error creating specialists: " + error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const specialist = await specialistService.getOneById(+req.params.id);
    res.json(specialist);
  } catch (error) {
    console.error("Error getting specialist: ", error);
    res.status(400).json({ error: "Error getting specialist: " + error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedSpecialist = await specialistService.updateOneById(+req.params.id, req.body);
    res.json(updatedSpecialist);
  } catch (error) {
    console.error("Error updating specialist: ", error);
    res.status(400).json({ error: "Error updating specialist: " + error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await specialistService.deleteOneById(+req.params.id);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting specialist: ", error);
    res.status(400).json({ error: "Error deleting specialist: " + error });
  }
});

export default router;
