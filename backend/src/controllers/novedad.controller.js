import {
  actualizarNovedad,
  crearNovedad,
  eliminarNovedad,
  listarNovedades,
  obtenerNovedad,
} from "../services/novedad.service.js";

export const getNovedades = async (req, res) => {
  res.status(200).json(await listarNovedades(req.query));
};

export const getNovedad = async (req, res) => {
  res.status(200).json(await obtenerNovedad(req.params.id));
};

export const postNovedad = async (req, res) => {
  res.status(201).json(await crearNovedad(req.body));
};

export const putNovedad = async (req, res) => {
  res.status(200).json(await actualizarNovedad(req.params.id, req.body));
};

export const deleteNovedad = async (req, res) => {
  res.status(200).json(await eliminarNovedad(req.params.id));
};
