import {
  actualizarSocio,
  crearSocio,
  eliminarSocio,
  listarSocios,
  obtenerSocio,
} from "../../services/socio.service.js";

class SocioController {
  async list(req, res) {
    res.json(await listarSocios(req.query));
  }

  async show(req, res) {
    res.json(await obtenerSocio(req.params.id));
  }

  async create(req, res) {
    res.status(201).json(await crearSocio(req.body));
  }

  async update(req, res) {
    res.status(200).json(await actualizarSocio(req.params.id, req.body));
  }

  async delete(req, res) {
    res.status(200).json(await eliminarSocio(req.params.id));
  }
}

export default new SocioController();
