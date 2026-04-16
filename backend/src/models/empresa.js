import { nowIso } from "../libs/time.js";

export const createEmpresa = (payload) => {
  const timestamp = nowIso();

  return {
    nombre: payload.nombre.trim(),
    cuit: payload.cuit.trim(),
    rubro: payload.rubro.trim(),
    contacto: payload.contacto.trim(),
    activo: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
};

export const updateEmpresa = (currentEmpresa, payload) => ({
  ...currentEmpresa,
  nombre: payload.nombre !== undefined ? payload.nombre.trim() : currentEmpresa.nombre,
  cuit: payload.cuit !== undefined ? payload.cuit.trim() : currentEmpresa.cuit,
  rubro: payload.rubro !== undefined ? payload.rubro.trim() : currentEmpresa.rubro,
  contacto:
    payload.contacto !== undefined
      ? payload.contacto.trim()
      : currentEmpresa.contacto,
});
