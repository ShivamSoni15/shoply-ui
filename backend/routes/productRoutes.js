import { Router } from "express";
import { createProduct, deleteProduct, getProduct, listCategories, listProducts, updateProduct } from "../controllers/productController.js";
import { requireAdmin, requireAuth } from "../middleware/authMiddleware.js";

const router = Router();
router.get("/categories", listCategories);
router.get("/", listProducts);
router.get("/:id", getProduct);
router.post("/", requireAuth, requireAdmin, createProduct);
router.patch("/:id", requireAuth, requireAdmin, updateProduct);
router.delete("/:id", requireAuth, requireAdmin, deleteProduct);

export default router;
