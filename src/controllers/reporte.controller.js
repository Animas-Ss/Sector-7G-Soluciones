import { obtenerResumen } from "../services/reporte.service.js";

class ReporteController {
  async getResumen(req, res) {
    const resumen = await obtenerResumen();
    res.render('reporte/resumen', {
      titulo: 'Dashboard Operativo',
      resumen
    });
  }
}

export default new ReporteController();
