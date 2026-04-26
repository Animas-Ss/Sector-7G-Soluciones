import {
  actualizarSeguimiento,
  crearSeguimiento,
  eliminarSeguimiento,
  listarSeguimientos,
  obtenerSeguimiento,
} from "../services/seguimiento.service.js";
import { listarNovedades } from "../services/novedad.service.js";

class SeguimientoController {
  async getAll(req, res) {
    const seguimientos = await listarSeguimientos(req.query);
    res.render('seguimientos/index', {
      titulo: 'Listado de Seguimientos',
      seguimientos
    });
  }

  async getForm(req, res) {
    const { id } = req.params;
    const novedades = await listarNovedades({});

    let seguimiento = null;
    if (id) seguimiento = await obtenerSeguimiento(id);
    res.render('seguimientos/form', {
      titulo: id ? 'Editar Seguimiento' : 'Nuevo Seguimiento',
      seguimiento,
      novedades
    });
  }

  async getById(req, res) {
    const seguimiento = await obtenerSeguimiento(req.params.id);
    res.render('seguimientos/detalle', {
      titulo: `Detalle Seguimiento #${seguimiento.id}`,
      seguimiento
    });
  }

  async create(req, res) { res.status(201).json(await crearSeguimiento(req.body)); }
  async update(req, res) { res.status(200).json(await actualizarSeguimiento(req.params.id, req.body)); }
  async delete(req, res) { res.status(200).json(await eliminarSeguimiento(req.params.id)); }
}

export default new SeguimientoController();
