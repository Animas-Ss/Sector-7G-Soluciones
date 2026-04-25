import { AppError } from "../libs/errors.js";

export const notFoundMiddleware = (req, res, next) => {
  next(new AppError(`Ruta no encontrada: ${req.method} ${req.originalUrl}`, 404));
};

export const errorMiddleware = (error, req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  const statusCode = error.statusCode || 500;
  const message =
    statusCode === 500 ? "Error interno del servidor" : error.message;

  res.status(statusCode).json({
    error: true,
    statusCode,
    message,
  });
};
