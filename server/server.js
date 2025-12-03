import "dotenv/config";
import express from "express";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import { loger } from "./middleware/loger.js";
import { notFound } from "./middleware/notFound.js";
import { serverErrors } from "./middleware/serverErrors.js";
import { connectToDB } from "./database/db.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use(cors());
// Falta agregar las limitaciones al cors, una vez subido a Render

app.use(loger);

app.get("/", (req, res) => {
  res.send("¡Bienvenido al API de Mueblería Jota!");
});

app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);

app.use(notFound);
app.use(serverErrors);

connectToDB()
  .then(() => {
    console.log("Base de datos conectada");
    app.listen(PORT, () =>
      console.log(`Servidor escuchando en el puerto ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos:", err.message);
    process.exit(1);
  });
