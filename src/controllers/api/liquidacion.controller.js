import {
  actualizarLiquidacion,
  crearLiquidacion,
  eliminarLiquidacion,
  listarLiquidaciones,
  obtenerLiquidacion,
} from "../../services/liquidacion.service.js";

class LiquidacionController {
  async list(req, res) { res.json(await listarLiquidaciones(req.query)); }
  async show(req, res) { res.json(await obtenerLiquidacion(req.params.id)); }
  async create(req, res) { res.status(201).json(await crearLiquidacion(req.body)); }
  async update(req, res) { res.status(200).json(await actualizarLiquidacion(req.params.id, req.body)); }
  async delete(req, res) { res.status(200).json(await eliminarLiquidacion(req.params.id)); }
}

export default new LiquidacionController();
