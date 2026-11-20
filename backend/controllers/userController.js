import { z } from "zod";
import User from "../models/User.js";

export async function listUsers(req, res) {
  const search = String(req.query.search || "").trim().slice(0, 100);
  const filter = search
    ? { $or: [{ fullName: { $regex: search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" } }, { email: { $regex: search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" } }] }
    : {};
  const users = await User.find(filter).select("fullName email role createdAt").sort({ createdAt: -1 }).limit(200);
  return res.json({ success: true, users: users.map((user) => ({ id: user.id, fullName: user.fullName, email: user.email, role: user.role, createdAt: user.createdAt })) });
}

export async function updateUserRole(req, res) {
  const { role } = z.object({ role: z.enum(["customer", "admin"]) }).parse(req.body);
  if (req.user.id === req.params.id && role !== "admin") {
    return res.status(409).json({ success: false, message: "You cannot remove your own administrator access." });
  }
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true, runValidators: true })
    .select("fullName email role createdAt");
  if (!user) return res.status(404).json({ success: false, message: "User not found." });
  return res.json({ success: true, user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role, createdAt: user.createdAt } });
}
