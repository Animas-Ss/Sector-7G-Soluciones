import {
  actualizarEmpleado,
  crearEmpleado,
  eliminarEmpleado,
  listarEmpleados,
  obtenerEmpleado,
} from "../services/empleado.service.js";

class EmpleadoController {
  async getAll(req, res) {
    res.status(200).json(await listarEmpleados(req.query));
  }

  async getById(req, res) {
    res.status(200).json(await obtenerEmpleado(req.params.id));
  }

  async create(req, res) {
    res.status(201).json(await crearEmpleado(req.body));
  }

  async update(req, res) {
    res.status(200).json(await actualizarEmpleado(req.params.id, req.body));
  }

  async delete(req, res) {
    res.status(200).json(await eliminarEmpleado(req.params.id));
  }
}

export default new EmpleadoController();
