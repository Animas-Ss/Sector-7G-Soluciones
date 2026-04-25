import { auditoriaDb } from "../db/auditoria.db.js";
import { createAuditoria } from "../models/auditoria.js";

export const registrarAuditoria = async (payload) => {
  const auditoria = createAuditoria(payload);
  return auditoriaDb.create(auditoria);
};

export const listarAuditoria = async ({ entidad, accion } = {}) => {
  const registros = await auditoriaDb.getAll();

  return registros.filter((registro) => {
    const coincideEntidad = entidad ? registro.entidad === entidad : true;
    const coincideAccion = accion ? registro.accion === accion : true;

    return coincideEntidad && coincideAccion;
  });
};
