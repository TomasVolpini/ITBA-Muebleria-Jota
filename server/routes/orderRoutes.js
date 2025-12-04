import express from "express";
import {
  placeOrder,
  getUserAllOrders,
  getUserOneOrder,
} from "../controllers/order.controller.js";
import { jwtAuth } from "../middleware/auth.js";

const order = express.Router();

// Rutas protegidas
order.post("/", jwtAuth, placeOrder);
order.get("/", jwtAuth, getUserAllOrders);
order.get("/:orderId", jwtAuth, getUserOneOrder);

export default order;
