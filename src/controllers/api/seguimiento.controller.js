import {
  actualizarSeguimiento,
  crearSeguimiento,
  eliminarSeguimiento,
  listarSeguimientos,
  obtenerSeguimiento,
} from "../../services/seguimiento.service.js";

class SeguimientoController {
  async list(req, res) { res.json(await listarSeguimientos(req.query)); }
  async show(req, res) { res.json(await obtenerSeguimiento(req.params.id)); }
  async create(req, res) { res.status(201).json(await crearSeguimiento(req.body)); }
  async update(req, res) { res.status(200).json(await actualizarSeguimiento(req.params.id, req.body)); }
  async delete(req, res) { res.status(200).json(await eliminarSeguimiento(req.params.id)); }
}

export default new SeguimientoController();
