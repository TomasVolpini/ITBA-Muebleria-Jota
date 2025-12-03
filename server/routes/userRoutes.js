import express from "express";
import { signUp, login } from "../controllers/auth.controller.js";
import { getUserProfile } from "../controllers/user.controller.js";
import { jwtAuth } from "../middleware/auth.js";

const user = express.Router();

user.post("/login", login);
user.post("/register", signUp);

// Rutas protegidas
user.get("/profile", jwtAuth, getUserProfile);

export default user;
