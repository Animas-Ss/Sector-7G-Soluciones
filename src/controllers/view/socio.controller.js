import { listarSocios, obtenerSocio } from "../../services/socio.service.js";

class SocioViewController {
  async getAll(req, res) {
    const socios = await listarSocios(req.query);
    res.render('socios/index', { titulo: 'Directorio de Socios', socios });
  }

  async getForm(req, res) {
    const { id } = req.params;
    if (id) {
      const socio = await obtenerSocio(id);
      res.render('socios/form', { titulo: 'Editar Socio', socio });
    } else {
      res.render('socios/form', { titulo: 'Nuevo Socio', socio: null });
    }
  }

  async getById(req, res) {
    const socio = await obtenerSocio(req.params.id);
    res.render('socios/detalle', { titulo: `Detalle: ${socio.nombre}`, socio });
  }
}

export default new SocioViewController();
