import express from "express";
import { getProfile,addToWishlist,addToCart,getCart,getWishlist,updateProfile } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.post("/wishlist", authMiddleware, addToWishlist);
router.post("/cart", authMiddleware, addToCart);
router.get("/cart",authMiddleware,getCart)
router.get("/wishlist", authMiddleware, getWishlist);
router.put("/profile", authMiddleware, updateProfile);

export default router;