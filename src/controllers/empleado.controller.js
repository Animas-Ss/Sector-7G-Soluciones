import {
  actualizarEmpleado,
  crearEmpleado,
  eliminarEmpleado,
  listarEmpleados,
  obtenerEmpleado,
} from "../services/empleado.service.js";
 
//-importa la lista de empresas para asignar un empleado a la empresa
import { listarEmpresas } from "../services/empresa.service.js";

class EmpleadoController {
  async getAll(req, res) {
    const empleados = await listarEmpleados(req.query);
    res.render('empleados/index',{ 
      titulo: 'Nómina de Empleados',
      empleados
    });
  }

  async getForm(req, res) {
    const { id } = req.params;
    // combo box empreas
    const empresas = await listarEmpresas({}); 
    
    if (id) {
      const empleado = await obtenerEmpleado(id);
      res.render('empleados/form', { 
        titulo: 'Editar Empleado', 
        empleado, empresas });
    } else {
      res.render('empleados/form', { 
        titulo: 'Nuevo Empleado', 
        empleado: null, empresas });
    }
  }

  async getById(req, res) {
    const empleado = await obtenerEmpleado(req.params.id);
    res.render('empleados/detalle', {
      titulo: `Detalle: ${empleado.nombre} ${empleado.apellido}`,
      empleado
    });
  }

  async create(req, res) {
    res.status(201).json(await crearEmpleado(req.body));
  }

  async update(req, res) {
    res.status(200).json(await actualizarEmpleado(req.params.id, req.body));
  }

  async delete(req, res) {
    res.status(200).json(await eliminarEmpleado(req.params.id));
  }
}

export default new EmpleadoController();
