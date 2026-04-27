import {
  actualizarEmpleado,
  crearEmpleado,
  eliminarEmpleado,
  listarEmpleados,
  obtenerEmpleado,
} from "../../services/empleado.service.js";

class EmpleadoController {
  async list(req, res) {
    res.json(await listarEmpleados(req.query));
  }

  async show(req, res) {
    res.json(await obtenerEmpleado(req.params.id));
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
