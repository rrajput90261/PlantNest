import Plant from "../models/Plant.js";

export const createPlant = async (req, res) => {
  try {
    const plant = await Plant.create(req.body);

    res.status(201).json({
      success: true,
      message: "Plant created successfully",
      plant,
    });
  } catch (error) {
    console.error("Create plant error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getPlants = async (req, res) => {
  try {
    const plants = await Plant.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: plants.length,
      plants,
    });
  } catch (error) {
    console.error("Get plants error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const findPlants = async (req, res) => {
  try {
    const { sunlight, category, maxPrice } = req.query;

    const filter = {};

    if (sunlight) {
      filter.sunlight = sunlight;
    }

    if (category) {
      filter.category = category;
    }

    if (maxPrice) {
      filter.price = { $lte: Number(maxPrice) };
    }

    const plants = await Plant.find(filter);

    res.status(200).json({
      success: true,
      count: plants.length,
      plants,
    });
  } catch (error) {
    console.error("Plant finder error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getPlantById = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);

    if (!plant) {
      return res.status(404).json({
        success: false,
        message: "Plant not found",
      });
    }

    res.status(200).json({
      success: true,
      plant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to get plant",
      error: error.message,
    });
  }
};