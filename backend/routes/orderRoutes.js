import { Router } from "express";
import { cancelMyOrder, createOrder, listMyOrders, listOrders, updateOrderStatus } from "../controllers/orderController.js";
import { requireAdmin, requireAuth } from "../middleware/authMiddleware.js";

const router = Router();
router.use(requireAuth);
router.post("/", createOrder);
router.get("/my-orders", listMyOrders);
router.patch("/:id/cancel", cancelMyOrder);
router.get("/mine", listMyOrders);
router.get("/", requireAdmin, listOrders);
router.patch("/:id/status", requireAdmin, updateOrderStatus);

export default router;
