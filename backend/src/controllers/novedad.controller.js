import {
  actualizarNovedad,
  crearNovedad,
  eliminarNovedad,
  listarNovedades,
  obtenerNovedad,
} from "../services/novedad.service.js";

class NovedadController {
  async getAll(req, res) {
    res.status(200).json(await listarNovedades(req.query));
  }

  async getById(req, res) {
    res.status(200).json(await obtenerNovedad(req.params.id));
  }

  async create(req, res) {
    res.status(201).json(await crearNovedad(req.body));
  }

  async update(req, res) {
    res.status(200).json(await actualizarNovedad(req.params.id, req.body));
  }

  async delete(req, res) {
    res.status(200).json(await eliminarNovedad(req.params.id));
  }
}

export default new NovedadController();
