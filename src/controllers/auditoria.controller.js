import { listarAuditoria } from "../services/auditoria.service.js";

class AuditoriaController {
  async getAll(req, res) {
    const logs = await listarAuditoria(req.query);
    res.render('auditoria/index', {
      titulo: 'Registro de Auditoría',
      logs
    });
  }
}

export default new AuditoriaController();
