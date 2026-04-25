import {
  actualizarLiquidacion,
  crearLiquidacion,
  eliminarLiquidacion,
  listarLiquidaciones,
  obtenerLiquidacion,
} from "../services/liquidacion.service.js";

export const getLiquidaciones = async (req, res) => {
  res.status(200).json(await listarLiquidaciones(req.query));
};

export const getLiquidacion = async (req, res) => {
  res.status(200).json(await obtenerLiquidacion(req.params.id));
};

export const postLiquidacion = async (req, res) => {
  res.status(201).json(await crearLiquidacion(req.body));
};

export const putLiquidacion = async (req, res) => {
  res.status(200).json(await actualizarLiquidacion(req.params.id, req.body));
};

export const deleteLiquidacion = async (req, res) => {
  res.status(200).json(await eliminarLiquidacion(req.params.id));
};
