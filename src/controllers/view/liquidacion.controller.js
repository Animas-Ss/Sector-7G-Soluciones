import { listarLiquidaciones, obtenerLiquidacion } from "../../services/liquidacion.service.js";
import { listarEmpresas } from "../../services/empresa.service.js";
import { listarEmpleados } from "../../services/empleado.service.js";

class LiquidacionViewController {
  async getAll(req, res) {
    const liquidaciones = await listarLiquidaciones(req.query);
    res.render('liquidaciones/index', { titulo: 'Listado de Liquidaciones', liquidaciones });
  }

  async getForm(req, res) {
    const { id } = req.params;
    const empresas = await listarEmpresas({});
    const empleados = await listarEmpleados({});
    let liquidacion = null;
    if (id) liquidacion = await obtenerLiquidacion(id);
    res.render('liquidaciones/form', {
      titulo: id ? 'Editar Liquidación' : 'Nueva Liquidación',
      liquidacion, empresas, empleados
    });
  }

  async getById(req, res) {
    const liquidacion = await obtenerLiquidacion(req.params.id);
    
    if (!liquidacion) {
      return res.status(404).send('Liquidación no encontrada');
  }

    res.render('liquidaciones/detalle', { 
      titulo: `Liquidación #${liquidacion._id}`, liquidacion 
    });
  }
}

export default new LiquidacionViewController();
