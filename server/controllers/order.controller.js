import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import createError from "http-errors";

export const placeOrder = async (req, res, next) => {
  try {
    const userId = req.user.userId;
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
    const userId = req.user.userId;
    const orders = await Order.find({ userId }).populate(
      "items.productId",
      "nombre precio"
    );
    if (!orders) return next(createError(404, "No se encontró ningún pedido"));
    res.json(orders);
  } catch (err) {
    console.error("Error getting orders:", err.message);
    next(createError(500, `Error al obtener pedidos: ${err.message}`));
  }
};

export const getUserOneOrder = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { orderId } = req.params;

    const order = await Order.findOne({ _id: orderId, userId }).populate(
      "items.productId",
      "nombre precio"
    );
    if (!order) return next(createError(404, "No se encontró el pedido"));
    res.json(order);
  } catch (err) {
    console.error("Error getting order:", err.message);
    next(createError(500, `Error al obtener el pedido: ${err.message}`));
  }
};
