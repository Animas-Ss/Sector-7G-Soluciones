import { listarAuditoria } from "../services/auditoria.service.js";

class AuditoriaController {
  async getAll(req, res) {
    const filtros = {
      entidad: req.query.modulo || undefined,
      accion: req.query.accion || undefined 
    };

    const registros = await listarAuditoria(filtros);

    const auditoria = await listarAuditoria(req.query);
    res.render('auditoria/index', {
      titulo: 'Auditoria',
      auditoria
    }
    )
  };
}

export default new AuditoriaController();
