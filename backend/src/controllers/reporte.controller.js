import { obtenerResumen } from "../services/reporte.service.js";

export const getResumen = async (req, res) => {
  res.status(200).json(await obtenerResumen());
};
