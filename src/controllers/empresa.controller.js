import {
  actualizarEmpresa,
  crearEmpresa,
  eliminarEmpresa,
  listarEmpresas,
  obtenerEmpresa,
} from "../services/empresa.service.js";



class EmpresaController {
  async getAll(req, res) {
    const empresas = await listarEmpresas(req.query);
    res.render('empresas/index', { 
      titulo: 'Directorio de Empresas',
      empresas: empresas
    });
  }

  async getForm(req, res) {
    const { id } = req.params;
    if (id) {
      // Busca ID para editar
      const empresa = await obtenerEmpresa(id);
      res.render('empresas/form', { 
        titulo: 'Editar Empresa', 
        empresa 
      });
    } else {
      // Si no hay ID, crea una empresa
      res.render('empresas/form', { 
        titulo: 'Nueva Empresa', 
        empresa: null 
      });
    }
  }

  async getById(req, res) {
    const empresa = await obtenerEmpresa(req.params.id);
    res.render('empresas/detalle', {
    titulo: `Detalle: ${empresa.nombre}`,
    empresa: empresa
    });
  }


  async create(req, res) {
    res.status(201).json(await crearEmpresa(req.body));
  }

  async update(req, res) {
    res.status(200).json(await actualizarEmpresa(req.params.id, req.body));
  }

  async delete(req, res) {
    res.status(200).json(await eliminarEmpresa(req.params.id));
  }
}

export default new EmpresaController();
