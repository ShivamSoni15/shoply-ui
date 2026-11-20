import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import User from "../models/User.js";

const registerSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  password: z.string().min(8).max(128),
});
const loginSchema = z.object({ email: z.string().trim().email(), password: z.string().min(1).max(128) });

function createToken(userId) {
  if (!process.env.JWT_SECRET) {
    const error = new Error("Authentication is not configured. Set JWT_SECRET.");
    error.statusCode = 503;
    throw error;
  }
  return jwt.sign({ sub: userId.toString() }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function assertAuthConfigured() {
  if (!process.env.JWT_SECRET) {
    const error = new Error("Authentication is not configured. Set JWT_SECRET.");
    error.statusCode = 503;
    throw error;
  }
}

function publicUser(user) {
  return { id: user._id, fullName: user.fullName, email: user.email, role: user.role };
}

export async function register(req, res) {
  assertAuthConfigured();
  const input = registerSchema.parse(req.body);
  const email = input.email.toLowerCase();
  if (await User.exists({ email })) {
    return res.status(409).json({ success: false, message: "An account with that email already exists." });
  }
  const user = await User.create({ ...input, email });
  return res.status(201).json({ success: true, token: createToken(user._id), user: publicUser(user) });
}

export async function login(req, res) {
  assertAuthConfigured();
  const input = loginSchema.parse(req.body);
  const user = await User.findOne({ email: input.email.toLowerCase() }).select("+password");
  if (!user || !(await bcrypt.compare(input.password, user.password))) {
    return res.status(401).json({ success: false, message: "Email or password is incorrect." });
  }
  return res.json({ success: true, token: createToken(user._id), user: publicUser(user) });
}

export function currentUser(req, res) {
  return res.json({ success: true, user: publicUser(req.user) });
}
