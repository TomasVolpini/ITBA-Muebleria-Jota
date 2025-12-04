import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        amount: { type: Number, required: true, min: 1 },
      },
    ],
    total: { type: Number, required: true },
    estado: {
      type: String,
      enum: ["pendiente", "confirmado", "enviado"],
      default: "pendiente",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
