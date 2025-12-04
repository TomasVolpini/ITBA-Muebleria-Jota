import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import createError from "http-errors";
import mongoose from "mongoose";

export const placeOrder = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { items, state } = req.body;

    if (!items || items.length === 0) {
      return next(createError(400, "El carrito está vacío"));
    }

    let total = 0;
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return next(createError(404, "Producto no encontrado"));
      }
      total += product.precio * item.amount;
      item.name = product.nombre;
      item.price = product.precio;
    }

    const newOrder = new Order({
      userId,
      items,
      total,
      state,
    });

    await newOrder.save();
    res
      .status(201)
      .json({ message: "Pedido creado con éxito", order: newOrder });
  } catch (err) {
    console.error("Error placing order:", err.message);
    next(createError(500, `Error al crear el pedido: ${err.message}`));
  }
};

export const getUserAllOrders = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId });
    if (!orders || orders.length === 0) {
      return next(createError(404, "No se encontró ningún pedido"));
    }

    res.json(orders);
  } catch (err) {
    console.error("Error getting orders:", err.message);
    next(createError(500, `Error al obtener pedidos: ${err.message}`));
  }
};

export const getUserOneOrder = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return next(createError(404, "No se encontró el pedido"));
    }

    const order = await Order.findOne({ _id: orderId, userId });
    if (!order) return next(createError(404, "No se encontró el pedido"));
    res.json(order);
  } catch (err) {
    console.error("Error getting order:", err.message);
    next(createError(500, `Error al obtener el pedido: ${err.message}`));
  }
};
