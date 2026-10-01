import express from "express";
import {
  createPlant,
  getPlants,
  findPlants,
  getPlantById,
} from "../controllers/plantController.js";

const router = express.Router();

router.post("/", createPlant);
router.get("/", getPlants);
router.get("/find", findPlants);
router.get("/:id",getPlantById)

export default router;