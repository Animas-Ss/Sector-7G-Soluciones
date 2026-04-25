import { nowIso } from "../libs/time.js";

export const createSeguimiento = (payload) => {
  const timestamp = nowIso();

  return {
    novedadId: Number(payload.novedadId),
    fecha: payload.fecha,
    responsable: payload.responsable.trim(),
    comentario: payload.comentario.trim(),
    activo: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
};

export const updateSeguimiento = (currentSeguimiento, payload) => ({
  ...currentSeguimiento,
  novedadId:
    payload.novedadId !== undefined
      ? Number(payload.novedadId)
      : currentSeguimiento.novedadId,
  fecha: payload.fecha !== undefined ? payload.fecha : currentSeguimiento.fecha,
  responsable:
    payload.responsable !== undefined
      ? payload.responsable.trim()
      : currentSeguimiento.responsable,
  comentario:
    payload.comentario !== undefined
      ? payload.comentario.trim()
      : currentSeguimiento.comentario,
});
