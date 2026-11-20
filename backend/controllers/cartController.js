import { z } from "zod";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const itemSchema = z.object({ productId: z.string().min(1), quantity: z.number().int().min(1).max(99) });

export async function getCart(req, res) {
  const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
  return res.json({ success: true, cart: cart || { items: [] } });
}

export async function setCartItem(req, res) {
  const { productId, quantity } = itemSchema.parse({ productId: req.params.productId || req.body.productId, quantity: req.body.quantity });
  const product = await Product.findOne({ _id: productId, active: true });
  if (!product) return res.status(404).json({ success: false, message: "Product not found." });
  if (product.stock < quantity) return res.status(409).json({ success: false, message: "Requested quantity is not in stock." });

  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) cart = new Cart({ user: req.user.id, items: [] });
  const existing = cart.items.find((item) => item.product.toString() === productId);
  if (existing) existing.quantity = quantity;
  else cart.items.push({ product: productId, quantity });
  await cart.save();
  await cart.populate("items.product");
  return res.json({ success: true, cart });
}

export const updateCartItem = setCartItem;

export async function removeCartItem(req, res) {
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) return res.json({ success: true, cart: { items: [] } });
  cart.items = cart.items.filter((item) => item.product.toString() !== req.params.productId);
  await cart.save();
  await cart.populate("items.product");
  return res.json({ success: true, cart });
}

export async function clearCart(req, res) {
  await Cart.findOneAndUpdate({ user: req.user.id }, { $set: { items: [] } });
  return res.json({ success: true, message: "Cart cleared." });
}
