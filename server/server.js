// server/server.js
import express from "express";
const app = express();

app.use(express.json());

// CHICOS AQIUI: Agregar rutas y lógica de la API)

app.get("/api/_health", (_req, res) => res.json({ ok: true }));
app.listen(5000, () => console.log("API en http://localhost:5000"));
