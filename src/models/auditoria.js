import { nowIso } from "../libs/time.js";

export const createAuditoria = ({ entidad, entidadId, accion, descripcion }) => ({
  entidad,
  entidadId: Number(entidadId),
  accion,
  descripcion,
  timestamp: nowIso(),
});
