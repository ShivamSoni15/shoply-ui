import { z } from "zod";
import Product from "../models/Product.js";

const productSchema = z.object({
  name: z.string().trim().min(1).max(160),
  description: z.string().trim().max(5000).optional(),
  price: z.number().finite().min(0),
  category: z.string().trim().min(1).max(80),
  image: z.string().trim().max(2000).optional(),
  stock: z.number().int().min(0).optional(),
  active: z.boolean().optional(),
});

export async function listProducts(req, res) {
  const filter = { active: true };
  if (req.query.category) filter.category = req.query.category;
  if (req.query.search) {
    const escaped = String(req.query.search).slice(0, 100).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    filter.$or = [{ name: { $regex: escaped, $options: "i" } }, { description: { $regex: escaped, $options: "i" } }];
  }
  const products = await Product.find(filter).sort({ createdAt: -1 }).limit(100);
  return res.json({ success: true, products });
}

export async function listCategories(_req, res) {
  const categories = await Product.distinct("category", { active: true });
  return res.json({ success: true, categories: categories.sort((a, b) => a.localeCompare(b)) });
}

export async function getProduct(req, res) {
  const product = await Product.findOne({ _id: req.params.id, active: true });
  if (!product) return res.status(404).json({ success: false, message: "Product not found." });
  return res.json({ success: true, product });
}

export async function createProduct(req, res) {
  const product = await Product.create(productSchema.parse(req.body));
  return res.status(201).json({ success: true, product });
}

export async function updateProduct(req, res) {
  const product = await Product.findByIdAndUpdate(req.params.id, productSchema.partial().parse(req.body), {
    new: true, runValidators: true,
  });
  if (!product) return res.status(404).json({ success: false, message: "Product not found." });
  return res.json({ success: true, product });
}

export async function deleteProduct(req, res) {
  const product = await Product.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
  if (!product) return res.status(404).json({ success: false, message: "Product not found." });
  return res.json({ success: true, message: "Product archived." });
}
