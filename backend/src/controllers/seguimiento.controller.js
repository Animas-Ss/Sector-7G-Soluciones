import {
  actualizarSeguimiento,
  crearSeguimiento,
  eliminarSeguimiento,
  listarSeguimientos,
  obtenerSeguimiento,
} from "../services/seguimiento.service.js";

class SeguimientoController {
  async getAll(req, res) {
    res.status(200).json(await listarSeguimientos(req.query));
  }

  async getById(req, res) {
    res.status(200).json(await obtenerSeguimiento(req.params.id));
  }

  async create(req, res) {
    res.status(201).json(await crearSeguimiento(req.body));
  }

  async update(req, res) {
    res.status(200).json(await actualizarSeguimiento(req.params.id, req.body));
  }

  async delete(req, res) {
    res.status(200).json(await eliminarSeguimiento(req.params.id));
  }
}

export default new SeguimientoController();
