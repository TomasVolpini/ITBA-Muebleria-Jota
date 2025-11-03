import express from "express";
import productRoutes from "./routes/productRoutes.js";
import { loger } from "./middleware/loger.js";
import { notFound } from "./middleware/notFound.js";
import { serverErrors } from "./middleware/serverErrors.js";
import dotenv from "dotenv";
dotenv.config({ path: "./server/.env" });

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(loger());

app.get("/", (req, res) => {
  res.send("¡Bienvenido al API de Mueblería Jota!");
});

app.use("/api/products", productRoutes);

app.use(notFound());
app.use(serverErrors());

app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`));
