// server/server.js
import express from "express";
const app = express();

app.use(express.json());
const PORT = 5000;

// CHICOS AQIUI: Agregar rutas y lógica de la API)

app.get("/api/_health", (_req, res) => res.json({ ok: true }));
app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`));
