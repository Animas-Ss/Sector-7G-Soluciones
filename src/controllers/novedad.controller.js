import {
  actualizarNovedad,
  crearNovedad,
  eliminarNovedad,
  listarNovedades,
  obtenerNovedad,
} from "../services/novedad.service.js";

class NovedadController {
  async getAll(req, res) {
    const novedades = await listarNovedades(req.query);
    res.render('novedades/index', {
      titulo: 'Gestión de Novedades',
      novedades
    });
  }

  async getForm(req, res) {
    const { id } = req.params;
    let novedad = null;
    if (id) novedad = await obtenerNovedad(id);

    res.render('novedades/form', {
      titulo: id ? 'Editar Novedad' : 'Nueva Novedad',
      novedad
    });
  }

  async getById(req, res) {
    const novedad = await obtenerNovedad(req.params.id);
    res.render('novedades/detalle', {
      titulo: `Detalle de Novedad #${novedad.id}`,
      novedad
    });
  }

  async create(req, res) { res.status(201).json(await crearNovedad(req.body)); }
  async update(req, res) { res.status(200).json(await actualizarNovedad(req.params.id, req.body)); }
  async delete(req, res) { res.status(200).json(await eliminarNovedad(req.params.id)); }
}

export default new NovedadController();
