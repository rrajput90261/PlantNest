import User from "../models/User.js";
import Plant from "../models/Plant.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Profile error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



export const addToWishlist = async (req, res) => {
  try {
    const { plantId } = req.body;

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.wishlist.includes(plantId)) {
      return res.status(400).json({
        success: false,
        message: "Plant already in wishlist",
      });
    }

    const plant = await Plant.findById(plantId);

    if (!plant) {
      return res.status(404).json({
        success: false,
        message: "Plant not found",
      });
    }

    user.wishlist.push(plantId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Plant added to wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("Wishlist error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { plantId, quantity = 1 } = req.body;

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const plant = await Plant.findById(plantId);

    if (!plant) {
      return res.status(404).json({
        success: false,
        message: "Plant not found",
      });
    }

    const existingItem = user.cart.find(
      (item) => item.plant.toString() === plantId
    );

    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      user.cart.push({
        plant: plantId,
        quantity: Number(quantity),
      });
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Plant added to cart",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Cart error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select("cart")
      .populate("cart.plant");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      cart: user.cart,
    });
  } catch (error) {
    console.error("Get cart error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select("wishlist")
      .populate("wishlist");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      wishlist: user.wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to get wishlist",
      error: error.message,
    });
  }
};