import Order from "../models/Order.js";
import User from "../models/User.js";

export const createOrder = async (req, res) => {
  try {
    const { address } = req.body;

    const user = await User.findById(req.user.userId).populate(
      "cart.plant"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.cart.length) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const items = user.cart.map((item) => ({
      plant: item.plant._id,
      quantity: item.quantity,
      price: item.plant.price,
    }));

    const totalAmount = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: user._id,
      items,
      totalAmount,
      address,
    });

    user.cart = [];
    await user.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.userId,
    })
      .populate("items.plant")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get orders error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};