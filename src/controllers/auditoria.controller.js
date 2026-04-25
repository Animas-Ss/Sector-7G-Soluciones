import { listarAuditoria } from "../services/auditoria.service.js";

class AuditoriaController {
  async getAll(req, res) {
    res.status(200).json(await listarAuditoria(req.query));
  }
}

export default new AuditoriaController();
