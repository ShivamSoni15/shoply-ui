import { z } from "zod";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

const addressSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(7).max(30),
  addressLine: z.string().trim().min(5).max(250),
  city: z.string().trim().min(1).max(100),
  state: z.string().trim().min(1).max(100),
  postalCode: z.string().trim().min(3).max(20),
  country: z.string().trim().min(2).max(80).optional(),
});
const checkoutSchema = z.object({ shippingAddress: addressSchema, paymentMethod: z.enum(["cod"]).default("cod") });
const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

export async function createOrder(req, res) {
  const input = checkoutSchema.parse(req.body);
  const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
  if (!cart?.items.length) return res.status(400).json({ success: false, message: "Your cart is empty." });

  const items = cart.items.map(({ product, quantity }) => {
    if (!product || !product.active) {
      const error = new Error("A product in your cart is no longer available.");
      error.statusCode = 409;
      throw error;
    }
    if (product.stock < quantity) {
      const error = new Error(`${product.name} does not have enough stock.`);
      error.statusCode = 409;
      throw error;
    }
    return { product: product._id, name: product.name, image: product.image, unitPrice: product.price, quantity };
  });

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const shipping = subtotal >= 999 ? 0 : 99;
  const order = await Order.create({
    user: req.user.id,
    items,
    shippingAddress: input.shippingAddress,
    paymentMethod: input.paymentMethod,
    subtotal,
    shipping,
    total: subtotal + shipping,
  });
  cart.items = [];
  await cart.save();
  return res.status(201).json({ success: true, order });
}

export async function listMyOrders(req, res) {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(100);
  return res.json({ success: true, orders });
}

export async function cancelMyOrder(req, res) {
  const order = await Order.findOne({ _id: req.params.id, user: req.user.id });
  if (!order) return res.status(404).json({ success: false, message: "Order not found." });
  if (order.status !== "pending") {
    return res.status(409).json({ success: false, message: "Only pending orders can be cancelled." });
  }
  order.status = "cancelled";
  await order.save();
  return res.json({ success: true, order });
}

export async function listOrders(_req, res) {
  const orders = await Order.find().populate("user", "fullName email").sort({ createdAt: -1 }).limit(200);
  return res.json({ success: true, orders });
}

export async function updateOrderStatus(req, res) {
  const status = z.enum(validStatuses).parse(req.body.status);
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
  if (!order) return res.status(404).json({ success: false, message: "Order not found." });
  return res.json({ success: true, order });
}
