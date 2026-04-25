import { nowIso } from "../libs/time.js";

export const createSocio = (payload) => {
  const timestamp = nowIso();

  return {
    nombre: payload.nombre.trim(),
    apellido: payload.apellido.trim(),
    dni: String(payload.dni).trim(),
    email: payload.email.trim(),
    telefono: payload.telefono ? payload.telefono.trim() : null,
    participacion: Number(payload.participacion),
    fechaIngreso: payload.fechaIngreso,
    activo: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
};

export const updateSocio = (currentSocio, payload) => ({
  ...currentSocio,
  nombre:
    payload.nombre !== undefined ? payload.nombre.trim() : currentSocio.nombre,
  apellido:
    payload.apellido !== undefined ? payload.apellido.trim() : currentSocio.apellido,
  dni:
    payload.dni !== undefined ? String(payload.dni).trim() : currentSocio.dni,
  email:
    payload.email !== undefined ? payload.email.trim() : currentSocio.email,
  telefono:
    payload.telefono !== undefined ? payload.telefono.trim() : currentSocio.telefono,
  participacion:
    payload.participacion !== undefined
      ? Number(payload.participacion)
      : currentSocio.participacion,
  fechaIngreso:
    payload.fechaIngreso !== undefined
      ? payload.fechaIngreso
      : currentSocio.fechaIngreso,
  updatedAt: nowIso(),
});
