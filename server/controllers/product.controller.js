import Product from "../models/product.model.js";
import mongoose from "mongoose";
import createError from "http-errors";

// GET todos los productos, GET un producto, POST nuevo producto, PUT de un producto, DELETE un producto

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(createError(500, "Error leyendo productos"));
  }
};

export const getProductById = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(createError(400, "ID inválido"));
    }
    const product = await Product.findById(req.params.id);
    if (!product)
      return next(createError(404, "El producto no fue encontrado"));
    res.json(product);
  } catch (err) {
    next(createError(500, `Error al buscar producto: ${err.message}`));
  }
};

export const postProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(createError(400, `Los datos no son válidos: ${err.message}`));
    }
    return next(createError(500, `Error de servidor: ${err.message}`));
  }
};

export const putProduct = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(createError(400, "ID inválido"));
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return next(createError(404, "El producto no fue encontrado"));
    }
    res.json(updatedProduct);
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(createError(400, `Los datos no son válidos: ${err.message}`));
    }
    next(createError(500, `Error al actualizar producto: ${err.message}`));
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(createError(400, "ID inválido"));
    }
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted)
      return next(createError(404, "El producto no fue encontrado"));
    res.json({ message: "Producto eliminado" });
  } catch (err) {
    next(createError(500, `Error al eliminar producto: ${err.message}`));
  }
};

// export const name = async (req, res, next) => {
//   try {
//   } catch (err) {}
// };
