import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import { connectDatabase } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware.js";

const app = express();
const allowedOrigins = [
  ...(process.env.CLIENT_URL || "http://localhost:5173").split(","),
  process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
  process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
]
  .map((origin) => origin && origin.trim())
  .filter(Boolean);

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      (process.env.NODE_ENV === "production" && origin.endsWith(".vercel.app"))
    ) {
      return callback(null, true);
    }
    return callback(new Error("Origin is not allowed by CORS"));
  },
  credentials: true,
}));
app.use(express.json({ limit: "10kb" }));
app.use("/api", rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
}));

const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
let dbPromise = null;

export async function ensureDatabaseConnected() {
  if (mongoose.connection.readyState === 1) return;
  if (!mongoUri) {
    return;
  }
  if (!dbPromise) {
    dbPromise = connectDatabase(mongoUri).catch((error) => {
      console.error("Could not connect to MongoDB:", error.message);
      dbPromise = null;
    });
  }
  return dbPromise;
}

app.use(async (_req, _res, next) => {
  await ensureDatabaseConnected();
  next();
});

app.get("/api", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Shoply API is running",
  });
});

app.get("/api/health", (_req, res) => {
  const databaseReady = mongoose.connection.readyState === 1;
  res.status(200).json({
    success: true,
    status: "api_running",
    database: databaseReady ? "connected" : "not_connected",
    message: databaseReady
      ? "Shoply API and database are ready."
      : "Shoply API is running, but MongoDB is not connected. Set MONGODB_URI to enable database features.",
  });
});

app.get("/api/health/ready", (_req, res) => {
  const databaseReady = mongoose.connection.readyState === 1;
  res.status(databaseReady ? 200 : 503).json({
    success: databaseReady,
    status: databaseReady ? "ready" : "database_unavailable",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const port = Number(process.env.PORT) || 5000;
if (process.env.NODE_ENV !== "test" && !process.env.VERCEL) {
  app.listen(port, "0.0.0.0", () => {
    console.log(`Shoply API listening on port ${port}`);

    if (!mongoUri) {
      console.warn("MONGODB_URI is not set. The API is available, but database features are disabled.");
      return;
    }

    ensureDatabaseConnected()
      .then(() => console.log("Connected to MongoDB."))
      .catch((error) => console.error("Could not connect to MongoDB:", error.message));
  });
}

export default app;
