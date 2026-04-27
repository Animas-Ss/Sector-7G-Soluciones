import { listarSeguimientos, obtenerSeguimiento } from "../../services/seguimiento.service.js";
import { listarNovedades } from "../../services/novedad.service.js";

class SeguimientoViewController {
  async getAll(req, res) {
    const seguimientos = await listarSeguimientos(req.query);
    res.render('seguimientos/index', { titulo: 'Listado de Seguimientos', seguimientos });
  }

  async getForm(req, res) {
    const { id } = req.params;
    const novedades = await listarNovedades({});
    let seguimiento = null;
    if (id) seguimiento = await obtenerSeguimiento(id);
    res.render('seguimientos/form', {
      titulo: id ? 'Editar Seguimiento' : 'Nuevo Seguimiento',
      seguimiento, novedades
    });
  }

  async getById(req, res) {
    const seguimiento = await obtenerSeguimiento(req.params.id);
    res.render('seguimientos/detalle', { titulo: `Detalle Seguimiento #${seguimiento.id}`, seguimiento });
  }
}

export default new SeguimientoViewController();
