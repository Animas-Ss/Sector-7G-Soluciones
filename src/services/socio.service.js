import { socioDb } from "../db/socio.db.js";
import { badRequest, notFound } from "../libs/errors.js";
import { registrarAuditoria } from "./auditoria.service.js";

const validarParticipacion = (participacion) => {
  const valor = Number(participacion);
  if (isNaN(valor) || valor <= 0 || valor > 100) {
    throw badRequest("La participación debe ser un número entre 1 y 100.");
  }
};


const validarDniUnico = async (dni, excludeId = null) => {
  const socios = await socioDb.findAll();
  const dniNormalizado = String(dni).trim();

  const existe = socios.some(s => 
    s.dni === dniNormalizado && 
    s._id.toString() !== String(excludeId)
  );

  if (existe) {
    throw badRequest(`Ya existe un socio registrado con el DNI ${dni}.`);
  }
};

export const listarSocios = async ({ activo } = {}) => {
  const socios = await socioDb.findAll();

  return socios.filter((socio) => {
    return activo === undefined ? true : socio.activo === (activo === "true");
  });
};

export const obtenerSocio = async (id) => {
  const socio = await socioDb.findById(id);

  if (!socio) {
    throw notFound("Socio no encontrado.");
  }

  return socio;
};

export const crearSocio = async (payload) => {
  validarParticipacion(payload.participacion);
  await validarDniUnico(payload.dni);

  const socio = await socioDb.create(payload);

  await registrarAuditoria({
    entidad: "socio",
    entidadId: socio._id,
    accion: "creacion",
    descripcion: `Se creó el socio ${socio._id} (${socio.nombre} ${socio.apellido}, DNI ${socio.dni}).`,
  });

  return socio;
};

export const actualizarSocio = async (id, payload) => {
  const socio = await socioDb.findById(id);

  if (!socio) {
    throw notFound("Socio no encontrado.");
  }

  if (payload.participacion !== undefined) {
    validarParticipacion(payload.participacion);
  }

  if (payload.dni !== undefined) {
    await validarDniUnico(payload.dni, id);
  }

  const socioActualizado = await socioDb.update(id, payload);

  await registrarAuditoria({
    entidad: "socio",
    entidadId: socio._id,
    accion: "modificacion",
    descripcion: `Se actualizó el socio ${socio._id} (${socio.nombre} ${socio.apellido}).`,
  });

  return socioActualizado;
};

export const eliminarSocio = async (id) => {
  const socio = await socioDb.findById(id);

  if (!socio) {
    throw notFound("Socio no encontrado.");
  }

  if (!socio.activo) {
    throw badRequest("El socio ya se encuentra inactivo.");
  }

  const socioEliminado = await socioDb.delete(id);

  await registrarAuditoria({
    entidad: "socio",
    entidadId: socio._id,
    accion: "baja_logica",
    descripcion: `Se dio de baja el socio ${socio._id} (${socio.nombre} ${socio.apellido}, DNI ${socio.dni}).`,
  });

  return socioEliminado;
};
