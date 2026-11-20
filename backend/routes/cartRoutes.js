import { Router } from "express";
import { clearCart, getCart, removeCartItem, setCartItem, updateCartItem } from "../controllers/cartController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();
router.use(requireAuth);
router.get("/", getCart);
router.post("/", setCartItem);
router.put("/items", setCartItem);
router.delete("/items/:productId", removeCartItem);
router.put("/:productId", updateCartItem);
router.delete("/:productId", removeCartItem);
router.delete("/", clearCart);

export default router;
