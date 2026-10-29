
import express from "express";
import {
  createPlant,
  getPlants,
  findPlants,
  getPlantById,
} from "../controllers/plantController.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public routes: everyone can view plants
router.get("/", getPlants);
router.get("/find", findPlants);
router.get("/:id", getPlantById);

// Admin-only route: create a plant
router.post("/", adminMiddleware, createPlant);

export default router;
