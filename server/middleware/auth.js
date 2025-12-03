import jwt from "jsonwebtoken";
import createError from "http-errors";
import User from "../models/user.model";

export const jwtAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return next(createError(401, "No autorizado. Token faltante"));

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findbyId(decoded.userId).select("-password");
    next();
  } catch (err) {
    console.error("Error al verificar token:", err.message);
    next(createError(401, `Token inválido o expirado: ${err.message}`));
  }
};

export const adminAuth = (req, res, next) => {
  if (req.user && req.user.rol.includes("admin")) {
    next();
  } else {
    next(createError(403, `Acceso denegado. Se requiere rol de administrador`));
  }
};
