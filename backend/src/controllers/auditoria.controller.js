import { listarAuditoria } from "../services/auditoria.service.js";

export const getAuditoria = async (req, res) => {
  res.status(200).json(await listarAuditoria(req.query));
};
