import { badRequest } from "../libs/errors.js";

export const requireFields = (fields) => (req, res, next) => {
  const missingFields = fields.filter((field) => {
    const value = req.body[field];
    return value === undefined || value === null || value === "";
  });

  if (missingFields.length > 0) {
    next(badRequest(`Faltan campos obligatorios: ${missingFields.join(", ")}`));
    return;
  }

  next();
};

export const requireBody = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    next(badRequest("El cuerpo de la solicitud no puede estar vacio."));
    return;
  }

  next();
};
