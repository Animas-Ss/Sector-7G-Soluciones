import {
  actualizarSeguimiento,
  crearSeguimiento,
  eliminarSeguimiento,
  listarSeguimientos,
  obtenerSeguimiento,
} from "../services/seguimiento.service.js";

export const getSeguimientos = async (req, res) => {
  res.status(200).json(await listarSeguimientos(req.query));
};

export const getSeguimiento = async (req, res) => {
  res.status(200).json(await obtenerSeguimiento(req.params.id));
};

export const postSeguimiento = async (req, res) => {
  res.status(201).json(await crearSeguimiento(req.body));
};

export const putSeguimiento = async (req, res) => {
  res.status(200).json(await actualizarSeguimiento(req.params.id, req.body));
};

export const deleteSeguimiento = async (req, res) => {
  res.status(200).json(await eliminarSeguimiento(req.params.id));
};
