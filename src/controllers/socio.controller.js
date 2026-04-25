import {
  actualizarSocio,
  crearSocio,
  eliminarSocio,
  listarSocios,
  obtenerSocio,
} from "../services/socio.service.js";

export const getSocios = async (req, res) => {
  const socios = await listarSocios(req.query);
  res.render('socios/index', {
    titulo: 'Directorio de Socios',
    socios
  });
};

export const getSocio = async (req, res) => {
  const socio = await obtenerSocio(req.params.id);
    res.render('socios/detalle', {
      titulo: `Detalle del Socio`,
      socio
    });
};

export const getFormSocio = async (req, res) => {
  const { id } = req.params;
  if (id) {
    const socio = await obtenerSocio(id);
    res.render('socios/form', { titulo: 'Editar Socio', socio });
  } else {
    res.render('socios/form', { titulo: 'Nuevo Socio', socio: null });
  }
};

export const postSocio = async (req, res) => {
  res.status(201).json(await crearSocio(req.body));
};

export const putSocio = async (req, res) => {
  res.status(200).json(await actualizarSocio(req.params.id, req.body));
};

export const deleteSocio = async (req, res) => {
  res.status(200).json(await eliminarSocio(req.params.id));
};
