import express from "express";
import {
  getAllProducts,
  getProductById,
  postProduct,
  putProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const prod = express.Router();

prod.get("/", getAllProducts);
prod.get("/:id", getProductById);
prod.post("/", postProduct);
prod.put("/:id", putProduct);
prod.delete("/:id", deleteProduct);

export default prod;
