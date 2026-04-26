import { listarNovedades, obtenerNovedad } from "../../services/novedad.service.js";
import { listarEmpresas } from "../../services/empresa.service.js";
import { listarEmpleados } from "../../services/empleado.service.js";

class NovedadViewController {
  async getAll(req, res) {
    const novedades = await listarNovedades(req.query);
    res.render('novedades/index', { titulo: 'Gestión de Novedades', novedades });
  }

  async getForm(req, res) {
    const { id } = req.params;
    const empresas = await listarEmpresas({});
    const empleados = await listarEmpleados({});
    let novedad = null;
    if (id) novedad = await obtenerNovedad(id);
    res.render('novedades/form', {
      titulo: id ? 'Editar Novedad' : 'Nueva Novedad',
      novedad, empresas, empleados
    });
  }

  async getById(req, res) {
    const novedad = await obtenerNovedad(req.params.id);
    res.render('novedades/detalle', { titulo: `Detalle de Novedad #${novedad.id}`, novedad });
  }
}

export default new NovedadViewController();
