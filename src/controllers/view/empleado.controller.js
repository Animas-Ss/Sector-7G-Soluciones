import { listarEmpleados, obtenerEmpleado } from "../../services/empleado.service.js";
import { listarEmpresas } from "../../services/empresa.service.js";

class EmpleadoViewController {
  async getAll(req, res) {
    const empleados = await listarEmpleados(req.query);
    res.render('empleados/index', { titulo: 'Nómina de Empleados', empleados });
  }

  async getForm(req, res) {
    const { id } = req.params;
    const empresas = await listarEmpresas({});
    if (id) {
      const empleado = await obtenerEmpleado(id);
      res.render('empleados/form', { titulo: 'Editar Empleado', empleado, empresas });
    } else {
      res.render('empleados/form', { titulo: 'Nuevo Empleado', empleado: null, empresas });
    }
  }

  async getById(req, res) {
    const empleado = await obtenerEmpleado(req.params.id);
    res.render('empleados/detalle', {
      titulo: `Detalle: ${empleado.nombre} ${empleado.apellido}`,
      empleado
    });
  }
}

export default new EmpleadoViewController();
