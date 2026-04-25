import { nowIso } from "../libs/time.js";

export const createNovedad = (payload) => {
  const timestamp = nowIso();

  return {
    tipo: payload.tipo.trim(),
    descripcion: payload.descripcion.trim(),
    estado: payload.estado ? payload.estado.trim() : "pendiente",
    fecha: payload.fecha,
    empresaId: Number(payload.empresaId),
    empleadoId: Number(payload.empleadoId),
    activo: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
};

export const updateNovedad = (currentNovedad, payload) => ({
  ...currentNovedad,
  tipo: payload.tipo !== undefined ? payload.tipo.trim() : currentNovedad.tipo,
  descripcion:
    payload.descripcion !== undefined
      ? payload.descripcion.trim()
      : currentNovedad.descripcion,
  estado:
    payload.estado !== undefined ? payload.estado.trim() : currentNovedad.estado,
  fecha: payload.fecha !== undefined ? payload.fecha : currentNovedad.fecha,
  empresaId:
    payload.empresaId !== undefined
      ? Number(payload.empresaId)
      : currentNovedad.empresaId,
  empleadoId:
    payload.empleadoId !== undefined
      ? Number(payload.empleadoId)
      : currentNovedad.empleadoId,
});
