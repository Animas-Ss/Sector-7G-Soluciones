import {
  actualizarSocio,
  crearSocio,
  eliminarSocio,
  listarSocios,
  obtenerSocio,
} from "../services/socio.service.js";

class SocioController {
  async getAll(req, res) {
    const socios = await listarSocios(req.query);
    res.render('socios/index', {
      titulo: 'Directorio de Socios',
      socios
    });
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
    res.render('socios/detalle', {
      titulo: `Detalle: ${socio.nombre}`,
      socio
    });
  }

  async create(req, res) {
    res.status(201).json(await crearSocio(req.body));
  }

  async update(req, res) {
    res.status(200).json(await actualizarSocio(req.params.id, req.body));
  }

  async delete(req, res) {
    res.status(200).json(await eliminarSocio(req.params.id));
  }
}

export default new SocioController();
