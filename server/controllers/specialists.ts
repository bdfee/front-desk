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
    res.status(500).json({ error: "Error getting specialists: " + error });
  }
});

router.post("/", async (req, res) => {
  try {
    const specialist = await Specialist.create(req.body);
    res.json(specialist);
  } catch (error) {
    console.log("Error creating specialists: ", error);
    res.status(500).json({ error: "Error creating specialists: " + error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const specialist = await Specialist.findByPk(req.params.id);
    res.json(specialist);
  } catch (error) {
    console.log("Error getting specialist: ", error);
    res.status(500).json({ error: "Error getting specialist: " + error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const specialist = await Specialist.findByPk(req.params.id);
    if (specialist) {
      const updatedSpecialist = await specialist.update({ ...specialist, ...req.body });
      res.json(updatedSpecialist);
    }
  } catch (error) {
    console.log("Error updateing specialist: ", error);
    res.status(500).json({ error: "Error updating specialist: " + error });
  }
});

export default router;
