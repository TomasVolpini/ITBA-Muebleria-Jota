import express from "express";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import createError from "http-errors";

const prod = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const productosPath = join(__dirname, "../database/productos.json");

// GET productos
prod.get("/", (req, res, next) => {
  fs.readFile(productosPath, "utf8", (err, data) => {
    if (err) {
      return next(createError(500, "Error leyendo productos"));
    }
    const productos = JSON.parse(data);
    res.json(productos);
  });
});

prod.get("/:id", (req, res, next) => {
  fs.readFile(productosPath, "utf8", (err, data) => {
    if (err) {
      return next(createError(500, "Error leyendo productos"));
    }
    const productos = JSON.parse(data);
    const producto = productos.find((p) => p.id === req.params.id);
    if (!producto) {
      return next(createError(404, "El producto no existe"));
    }

    res.json(producto);
  });
});

// POST productos
prod.post("/", (req, res, next) => {
  const nuevoProducto = req.body;

  if (
    !nuevoProducto ||
    !nuevoProducto.nombre ||
    !nuevoProducto.descripcion ||
    !nuevoProducto.precio
  ) {
    return next(
      createError(
        400,
        "Producto inválido. Debe incluir al menos nombre, descripción y precio."
      )
    );
  }

  fs.readFile(productosPath, "utf8", (err, data) => {
    if (err) {
      return next(createError(500, "Error leyendo productos"));
    }

    const productos = JSON.parse(data);

    let maxNum = 0;
    productos.forEach((p) => {
      const match = p.id.match(/p-(\d+)/);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNum) maxNum = num;
      }
    });
    nuevoProducto.id = `p-${String(maxNum + 1).padStart(3, "0")}`;

    productos.push(nuevoProducto);

    fs.writeFile(productosPath, JSON.stringify(productos), (err) => {
      if (err) {
        return next(createError(500, "Error guardando productos"));
      }

      res.status(201).json({
        mensaje: "Producto creado con éxito",
        producto: nuevoProducto,
      });
    });
  });
});

export default prod;
