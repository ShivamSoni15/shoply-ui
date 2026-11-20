import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 160 },
  description: { type: String, default: "", trim: true, maxlength: 5000 },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, trim: true, maxlength: 80, index: true },
  image: { type: String, default: "", trim: true },
  stock: { type: Number, default: 0, min: 0, validate: Number.isInteger },
  active: { type: Boolean, default: true, index: true },
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
