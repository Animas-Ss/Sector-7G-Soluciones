import { obtenerResumen } from "../services/reporte.service.js";

class ReporteController {
  async getResumen(req, res) {
    res.status(200).json(await obtenerResumen());
  }
}

export default new ReporteController();
