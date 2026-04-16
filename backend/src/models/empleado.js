import { nowIso } from "../libs/time.js";

export const createEmpleado = (payload) => {
  const timestamp = nowIso();

  return {
    nombre: payload.nombre.trim(),
    apellido: payload.apellido.trim(),
    dni: String(payload.dni).trim(),
    puesto: payload.puesto.trim(),
    email: payload.email.trim(),
    empresaId: Number(payload.empresaId),
    activo: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
};

export const updateEmpleado = (currentEmpleado, payload) => ({
  ...currentEmpleado,
  nombre:
    payload.nombre !== undefined ? payload.nombre.trim() : currentEmpleado.nombre,
  apellido:
    payload.apellido !== undefined
      ? payload.apellido.trim()
      : currentEmpleado.apellido,
  dni: payload.dni !== undefined ? String(payload.dni).trim() : currentEmpleado.dni,
  puesto:
    payload.puesto !== undefined ? payload.puesto.trim() : currentEmpleado.puesto,
  email: payload.email !== undefined ? payload.email.trim() : currentEmpleado.email,
  empresaId:
    payload.empresaId !== undefined
      ? Number(payload.empresaId)
      : currentEmpleado.empresaId,
});
