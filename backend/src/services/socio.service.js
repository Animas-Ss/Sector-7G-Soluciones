import { socioDb } from "../db/socio.db.js";
import { badRequest, notFound } from "../libs/errors.js";
import { createSocio, updateSocio } from "../models/socio.js";
import { registrarAuditoria } from "./auditoria.service.js";

const validarParticipacion = (participacion) => {
  const valor = Number(participacion);
  if (isNaN(valor) || valor <= 0 || valor > 100) {
    throw badRequest("La participación debe ser un número entre 1 y 100.");
  }
};

const validarDniUnico = async (dni, excludeId = null) => {
  const socios = await socioDb.getAll();
  const duplicado = socios.find(
    (s) => s.dni === String(dni).trim() && s.id !== excludeId
  );

  if (duplicado) {
    throw badRequest(`Ya existe un socio registrado con el DNI ${dni}.`);
  }
};

export const listarSocios = async ({ activo } = {}) => {
  const socios = await socioDb.getAll();

  return socios.filter((socio) => {
    return activo === undefined ? true : socio.activo === (activo === "true");
  });
};

export const obtenerSocio = async (id) => {
  const socio = await socioDb.getById(id);

  if (!socio) {
    throw notFound("Socio no encontrado.");
  }

  return socio;
};

export const crearSocio = async (payload) => {
  validarParticipacion(payload.participacion);
  await validarDniUnico(payload.dni);

  const socio = await socioDb.create(createSocio(payload));

  await registrarAuditoria({
    entidad: "socio",
    entidadId: socio.id,
    accion: "creacion",
    descripcion: `Se creó el socio ${socio.id} (${socio.nombre} ${socio.apellido}, DNI ${socio.dni}).`,
  });

  return socio;
};

export const actualizarSocio = async (id, payload) => {
  const socio = await socioDb.getById(id);

  if (!socio) {
    throw notFound("Socio no encontrado.");
  }

  if (payload.participacion !== undefined) {
    validarParticipacion(payload.participacion);
  }

  if (payload.dni !== undefined) {
    await validarDniUnico(payload.dni, socio.id);
  }

  const socioActualizado = await socioDb.update(id, updateSocio(socio, payload));

  await registrarAuditoria({
    entidad: "socio",
    entidadId: socio.id,
    accion: "modificacion",
    descripcion: `Se actualizó el socio ${socio.id} (${socio.nombre} ${socio.apellido}).`,
  });

  return socioActualizado;
};

export const eliminarSocio = async (id) => {
  const socio = await socioDb.getById(id);

  if (!socio) {
    throw notFound("Socio no encontrado.");
  }

  if (!socio.activo) {
    throw badRequest("El socio ya se encuentra inactivo.");
  }

  const socioEliminado = await socioDb.remove(id);

  await registrarAuditoria({
    entidad: "socio",
    entidadId: socio.id,
    accion: "baja_logica",
    descripcion: `Se dio de baja el socio ${socio.id} (${socio.nombre} ${socio.apellido}, DNI ${socio.dni}).`,
  });

  return socioEliminado;
};
