import express from "express";
import { signUp, login } from "../controllers/auth.controller";
import { getUserProfile } from "../controllers/user.controller";
import { jwtAuth } from "../middleware/auth";

const user = express.Router();

user.post("/login", login);
user.post("/register", signUp);

// Rutas protegidas
user.get("/profile", jwtAuth, getUserProfile);

export default user;
