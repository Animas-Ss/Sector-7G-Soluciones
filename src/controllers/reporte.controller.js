import { listarEmpresas } from "../services/empresa.service.js";
import { listarEmpleados } from "../services/empleado.service.js";
import { listarNovedades } from "../services/novedad.service.js";

class ReporteController {
  async getResumen(req, res) {
    try {
      const empresas = await listarEmpresas({});
      const empleados = await listarEmpleados({});
      const novedades = await listarNovedades({});

      const resumen = {
        totalEmpresas: empresas.length || 0,
        totalEmpleados: empleados.length || 0,
        novedadesPendientes: novedades.filter(n => n.estado !== 'Procesada').length || 0,
        novedadesPorTipo: novedades.reduce((acc, n) => {
          acc[n.tipo] = (acc[n.tipo] || 0) + 1;
          return acc;
        }, {})
      };

      res.render('reporte/resumen', {
        titulo: 'Dashboard Operativo',
        resumen
      });
    } catch (error) {
      console.error("Error en ReporteController:", error);
      res.status(500).json({ error: true, message: "Error al generar el resumen de reporte" });
    }
  }
}

export default new ReporteController();

