import mongoose from "mongoose";

const plantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      default: "Indoor",
    },

    sunlight: {
      type: String,
      default: "Medium",
    },

    watering: {
      type: String,
      default: "Weekly",
    },

    image: {
      type: String,
      default: "",
    },

    stock: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Plant = mongoose.model("Plant", plantSchema);

export default Plant;