// backend/models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, default: "" },
    precio: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    categoria: { type: String, default: "General" },
    imagen: { type: String, default: "" },
    caracteristicas: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
