import express from "express";
import {
  getAllProducts,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import { jwtAuth, adminAuth } from "../middleware/auth.js";

const prod = express.Router();

prod.get("/", getAllProducts);
prod.get("/:id", getProductById);

//Rutas protegidas
prod.post("/", jwtAuth, adminAuth, postProduct);
prod.put("/:id", jwtAuth, adminAuth, putProduct);
prod.delete("/:id", jwtAuth, adminAuth, deleteProduct);

export default prod;
