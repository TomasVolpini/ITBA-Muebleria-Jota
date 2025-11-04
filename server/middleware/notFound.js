import createError from "http-errors";

export const notFound = (req, res, next) => {
  next(createError(404, `Ruta no encontrada: ${req.originalUrl}`));
};
