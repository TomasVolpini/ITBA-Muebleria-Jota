import express from "express";
const app = express();
import productRoutes from "./routes/productRoutes.js";
import createError from "http-errors";

app.use(express.json());
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("¡Bienvenido al API de Mueblería Jota!");
});

app.use("/api/products", productRoutes);

app.use((req, res, next) => {
  next(createError(404, `Ruta no encontrada: ${req.originalUrl}`));
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;

  console.error(err.message, err.stack);

  res.status(statusCode).json({
    message: err.message || "Ha ocurrido un error en el servidor.",

    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
});

app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`));
