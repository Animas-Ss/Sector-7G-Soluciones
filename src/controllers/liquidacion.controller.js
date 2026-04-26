import {
  actualizarLiquidacion,
  crearLiquidacion,
  eliminarLiquidacion,
  listarLiquidaciones,
  obtenerLiquidacion,
} from "../services/liquidacion.service.js";

class LiquidacionController {
  async getAll(req, res) {
    const liquidaciones = await listarLiquidaciones(req.query);
    res.render('liquidaciones/index', {
      titulo: 'Listado de Liquidaciones',
      liquidaciones
    });
  }

  async getForm(req, res) {
    const { id } = req.params;
    let liquidacion = null;
    if (id) liquidacion = await obtenerLiquidacion(id);
    res.render('liquidaciones/form', {
      titulo: id ? 'Editar Liquidación' : 'Nueva Liquidación',
      liquidacion
    });
  }

  async getById(req, res) {
    const liquidacion = await obtenerLiquidacion(req.params.id);
    res.render('liquidaciones/detalle', {
      titulo: `Liquidación #${liquidacion.id}`,
      liquidacion
    });
  }

  async create(req, res) {
    res.status(201).json(await crearLiquidacion(req.body));
  }

  async update(req, res) {
    res.status(200).json(await actualizarLiquidacion(req.params.id, req.body));
  }

  async delete(req, res) {
    res.status(200).json(await eliminarLiquidacion(req.params.id));
  }
}

export default new LiquidacionController();
