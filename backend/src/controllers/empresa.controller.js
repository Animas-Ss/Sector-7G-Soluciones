import {
  actualizarEmpresa,
  crearEmpresa,
  eliminarEmpresa,
  listarEmpresas,
  obtenerEmpresa,
} from "../services/empresa.service.js";

export const getEmpresas = async (req, res) => {
  res.status(200).json(await listarEmpresas(req.query));
};

export const getEmpresa = async (req, res) => {
  res.status(200).json(await obtenerEmpresa(req.params.id));
};

export const postEmpresa = async (req, res) => {
  res.status(201).json(await crearEmpresa(req.body));
};

export const putEmpresa = async (req, res) => {
  res.status(200).json(await actualizarEmpresa(req.params.id, req.body));
};

export const deleteEmpresa = async (req, res) => {
  res.status(200).json(await eliminarEmpresa(req.params.id));
};
