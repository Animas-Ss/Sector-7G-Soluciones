import {
  actualizarEmpleado,
  crearEmpleado,
  eliminarEmpleado,
  listarEmpleados,
  obtenerEmpleado,
} from "../services/empleado.service.js";

export const getEmpleados = async (req, res) => {
  res.status(200).json(await listarEmpleados(req.query));
};

export const getEmpleado = async (req, res) => {
  res.status(200).json(await obtenerEmpleado(req.params.id));
};

export const postEmpleado = async (req, res) => {
  res.status(201).json(await crearEmpleado(req.body));
};

export const putEmpleado = async (req, res) => {
  res.status(200).json(await actualizarEmpleado(req.params.id, req.body));
};

export const deleteEmpleado = async (req, res) => {
  res.status(200).json(await eliminarEmpleado(req.params.id));
};
