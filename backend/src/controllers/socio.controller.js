import {
  actualizarSocio,
  crearSocio,
  eliminarSocio,
  listarSocios,
  obtenerSocio,
} from "../services/socio.service.js";

export const getSocios = async (req, res) => {
  res.status(200).json(await listarSocios(req.query));
};

export const getSocio = async (req, res) => {
  res.status(200).json(await obtenerSocio(req.params.id));
};

export const postSocio = async (req, res) => {
  res.status(201).json(await crearSocio(req.body));
};

export const putSocio = async (req, res) => {
  res.status(200).json(await actualizarSocio(req.params.id, req.body));
};

export const deleteSocio = async (req, res) => {
  res.status(200).json(await eliminarSocio(req.params.id));
};
