import { listarAuditoria } from "../services/auditoria.service.js";

class AuditoriaController {
  async getAll(req, res) {
    const filtros = {
      entidad: req.query.modulo || undefined,
      accion: req.query.accion || undefined 
    };
    
    const registros = await listarAuditoria(filtros);


    res.render('auditoria/index', { 
      titulo: 'Auditoría del Sistema',
      registros 
    });
  }
}


export default new AuditoriaController();