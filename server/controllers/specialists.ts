import { Router } from "express";
import Specialist from "../models/specialist";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const specialists = await Specialist.findAll();
    res.json(specialists);
  } catch (error) {
    console.log("Error getting specialists:", error);
    res.status(500).json({ error: "Error getting specialists" });
  }
});

export default router;
