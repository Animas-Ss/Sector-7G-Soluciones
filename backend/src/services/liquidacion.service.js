import { liquidacionDb } from "../db/liquidacion.db.js";
import { empleadoDb } from "../db/empleado.db.js";
import { empresaDb } from "../db/empresa.db.js";
import { badRequest, notFound } from "../libs/errors.js";
import { createLiquidacion, updateLiquidacion } from "../models/liquidacion.js";
import { registrarAuditoria } from "./auditoria.service.js";

const LIQUIDACION_ESTADOS = ["pendiente", "procesada", "rechazada"];

const validarEstado = (estado) => {
  if (estado && !LIQUIDACION_ESTADOS.includes(estado)) {
    throw badRequest(
      `Estado invalido. Valores permitidos: ${LIQUIDACION_ESTADOS.join(", ")}.`
    );
  }
};

const validarEmpleadoYEmpresa = async (empleadoId, empresaId) => {
  const [empleado, empresa] = await Promise.all([
    empleadoDb.getById(empleadoId),
    empresaDb.getById(empresaId),
  ]);

  if (!empresa) {
    throw badRequest("La empresa indicada no existe.");
  }

  if (!empresa.activo) {
    throw badRequest("La empresa indicada se encuentra inactiva.");
  }

  if (!empleado) {
    throw badRequest("El empleado indicado no existe.");
  }

  if (!empleado.activo) {
    throw badRequest("El empleado indicado se encuentra inactivo.");
  }

  if (empleado.empresaId !== empresa.id) {
    throw badRequest("El empleado no pertenece a la empresa indicada.");
  }

  return { empleado, empresa };
};

const buildLiquidacionView = (liquidacion, empleado, empresa) => ({
  ...liquidacion,
  empresa: empresa
    ? { id: empresa.id, nombre: empresa.nombre, cuit: empresa.cuit }
    : null,
  empleado: empleado
    ? {
        id: empleado.id,
        nombre: empleado.nombre,
        apellido: empleado.apellido,
        puesto: empleado.puesto,
      }
    : null,
});

export const listarLiquidaciones = async ({ empresaId, empleadoId, estado, activo } = {}) => {
  validarEstado(estado);

  const [liquidaciones, empleados, empresas] = await Promise.all([
    liquidacionDb.getAll(),
    empleadoDb.getAll(),
    empresaDb.getAll(),
  ]);

  return liquidaciones
    .filter((liq) => {
      const coincideEmpresa = empresaId ? liq.empresaId === Number(empresaId) : true;
      const coincideEmpleado = empleadoId ? liq.empleadoId === Number(empleadoId) : true;
      const coincideEstado = estado ? liq.estado === estado : true;
      const coincideActivo =
        activo === undefined ? true : liq.activo === (activo === "true");

      return coincideEmpresa && coincideEmpleado && coincideEstado && coincideActivo;
    })
    .map((liq) =>
      buildLiquidacionView(
        liq,
        empleados.find((e) => e.id === liq.empleadoId),
        empresas.find((e) => e.id === liq.empresaId)
      )
    );
};

export const obtenerLiquidacion = async (id) => {
  const [liquidacion, empleados, empresas] = await Promise.all([
    liquidacionDb.getById(id),
    empleadoDb.getAll(),
    empresaDb.getAll(),
  ]);

  if (!liquidacion) {
    throw notFound("Liquidacion no encontrada.");
  }

  return buildLiquidacionView(
    liquidacion,
    empleados.find((e) => e.id === liquidacion.empleadoId),
    empresas.find((e) => e.id === liquidacion.empresaId)
  );
};

export const crearLiquidacion = async (payload) => {
  validarEstado(payload.estado);
  await validarEmpleadoYEmpresa(payload.empleadoId, payload.empresaId);

  const liquidacion = await liquidacionDb.create(createLiquidacion(payload));

  await registrarAuditoria({
    entidad: "liquidacion",
    entidadId: liquidacion.id,
    accion: "creacion",
    descripcion: `Se creo la liquidacion ${liquidacion.id} para el empleado ${liquidacion.empleadoId} (periodo ${liquidacion.periodo}).`,
  });

  return liquidacion;
};

export const actualizarLiquidacion = async (id, payload) => {
  const liquidacion = await liquidacionDb.getById(id);

  if (!liquidacion) {
    throw notFound("Liquidacion no encontrada.");
  }

  validarEstado(payload.estado);

  const empresaId =
    payload.empresaId !== undefined ? Number(payload.empresaId) : liquidacion.empresaId;
  const empleadoId =
    payload.empleadoId !== undefined ? Number(payload.empleadoId) : liquidacion.empleadoId;

  await validarEmpleadoYEmpresa(empleadoId, empresaId);

  const estadoAnterior = liquidacion.estado;
  const liquidacionActualizada = await liquidacionDb.update(
    id,
    updateLiquidacion(liquidacion, payload)
  );

  if (payload.estado && payload.estado !== estadoAnterior) {
    await registrarAuditoria({
      entidad: "liquidacion",
      entidadId: liquidacion.id,
      accion: "cambio_estado",
      descripcion: `La liquidacion ${liquidacion.id} cambio de ${estadoAnterior} a ${payload.estado}.`,
    });
  }

  await registrarAuditoria({
    entidad: "liquidacion",
    entidadId: liquidacion.id,
    accion: "modificacion",
    descripcion: `Se actualizo la liquidacion ${liquidacion.id}.`,
  });

  return liquidacionActualizada;
};

export const eliminarLiquidacion = async (id) => {
  const liquidacion = await liquidacionDb.getById(id);

  if (!liquidacion) {
    throw notFound("Liquidacion no encontrada.");
  }

  if (!liquidacion.activo) {
    throw badRequest("La liquidacion ya se encuentra inactiva.");
  }

  const liquidacionEliminada = await liquidacionDb.remove(id);

  await registrarAuditoria({
    entidad: "liquidacion",
    entidadId: liquidacion.id,
    accion: "baja_logica",
    descripcion: `Se dio de baja la liquidacion ${liquidacion.id}.`,
  });

  return liquidacionEliminada;
};
