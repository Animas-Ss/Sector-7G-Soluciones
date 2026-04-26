import { listarAuditoria } from "../../services/auditoria.service.js";

class AuditoriaController {
  async list(req, res) {
    const filtros = {
      entidad: req.query.modulo || undefined,
      accion:  req.query.accion  || undefined
    };
    res.json(await listarAuditoria(filtros));
  }
}

export default new AuditoriaController();