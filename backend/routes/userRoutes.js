import { Router } from "express";
import { listUsers, updateUserRole } from "../controllers/userController.js";
import { requireAdmin, requireAuth } from "../middleware/authMiddleware.js";

const router = Router();
router.use(requireAuth, requireAdmin);
router.get("/", listUsers);
router.patch("/:id/role", updateUserRole);

export default router;
