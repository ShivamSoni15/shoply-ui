import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function requireAuth(req, res, next) {
  const token = req.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return res.status(401).json({ success: false, message: "Sign in to continue." });
  if (!process.env.JWT_SECRET) {
    return res.status(503).json({ success: false, message: "Authentication is not configured." });
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({ success: false, message: "Session is invalid or expired." });
  }

  const user = await User.findById(payload.sub).select("-password");
  if (!user) return res.status(401).json({ success: false, message: "Account not found." });
  req.user = user;
  return next();
}

export function requireAdmin(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ success: false, message: "Administrator access required." });
  }
  return next();
}
