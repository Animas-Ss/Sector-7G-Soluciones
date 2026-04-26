import { listarEmpresas, obtenerEmpresa } from "../../services/empresa.service.js";

class EmpresaViewController {
  async getAll(req, res) {
    const empresas = await listarEmpresas(req.query);
    res.render('empresas/index', { titulo: 'Directorio de Empresas', empresas });
  }

  async getForm(req, res) {
    const { id } = req.params;
    if (id) {
      const empresa = await obtenerEmpresa(id);
      res.render('empresas/form', { titulo: 'Editar Empresa', empresa });
    } else {
      res.render('empresas/form', { titulo: 'Nueva Empresa', empresa: null });
    }
  }

  async getById(req, res) {
    const empresa = await obtenerEmpresa(req.params.id);
    res.render('empresas/detalle', { titulo: `Detalle: ${empresa.nombre}`, empresa });
  }
}

export default new EmpresaViewController();
