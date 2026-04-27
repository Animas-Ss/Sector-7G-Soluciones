import {
  actualizarEmpresa,
  crearEmpresa,
  eliminarEmpresa,
  listarEmpresas,
  obtenerEmpresa,
} from "../../services/empresa.service.js";

class EmpresaController {
  async list(req, res) {
    res.json(await listarEmpresas(req.query));
  }

  async show(req, res) {
    res.json(await obtenerEmpresa(req.params.id));
  }

  async create(req, res) {
    res.status(201).json(await crearEmpresa(req.body));
  }

  async update(req, res) {
    res.status(200).json(await actualizarEmpresa(req.params.id, req.body));
  }

  async delete(req, res) {
    res.status(200).json(await eliminarEmpresa(req.params.id));
  }
}

export default new EmpresaController();
