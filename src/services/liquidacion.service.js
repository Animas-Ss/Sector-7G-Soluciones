import { liquidacionDb } from "../db/liquidacion.db.js";
import { empleadoDb } from "../db/empleado.db.js";
import { empresaDb } from "../db/empresa.db.js";
import { badRequest, notFound } from "../libs/errors.js";
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
    empleadoDb.findById(empleadoId),
    empresaDb.findById(empresaId),
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

  if (empleado.empresaId.toString() !== empresa._id.toString()) {
    throw badRequest("El empleado no pertenece a la empresa indicada.");
  }

  return { empleado, empresa };
};

export const listarLiquidaciones = async ({ empresaId, empleadoId, estado, activo } = {}) => {
  validarEstado(estado);

  const liquidaciones = await liquidacionDb.findAll();

  return liquidaciones.filter((liq) => {
    const coincideEmpresa = empresaId 
      ? liq.empresaId._id.toString() === String(empresaId) 
      : true;
      
    const coincideEmpleado = empleadoId 
      ? liq.empleadoId._id.toString() === String(empleadoId) 
      : true;
      
    const coincideEstado = estado ? liq.estado === estado : true;
    const coincideActivo =
      activo === undefined ? true : liq.activo === (activo === "true");

    return coincideEmpresa && coincideEmpleado && coincideEstado && coincideActivo;
  });
};


export const obtenerLiquidacion = async (id) => {
  const liquidacion = await liquidacionDb.findById(id);

  if (!liquidacion) throw notFound("Liquidacion no encontrada.");

  return liquidacion;
};

export const crearLiquidacion = async (payload) => {
  validarEstado(payload.estado);
  await validarEmpleadoYEmpresa(payload.empleadoId, payload.empresaId);

  const liquidacion = await liquidacionDb.create(payload);

  await registrarAuditoria({
    entidad: "liquidacion",
    entidadId: liquidacion._id,
    accion: "creacion",
    descripcion: `Se creo la liquidacion ${liquidacion._id} para el empleado ${liquidacion.empleadoId} (periodo ${liquidacion.periodo}).`,
  });

  return liquidacion;
};

export const actualizarLiquidacion = async (id, payload) => {
  const liquidacion = await liquidacionDb.findById(id);

  if (!liquidacion) {
    throw notFound("Liquidacion no encontrada.");
  }

  validarEstado(payload.estado);

  const empresaId = payload.empresaId !== undefined ? payload.empresaId : liquidacion.empresaId._id;
  const empleadoId = payload.empleadoId !== undefined ? payload.empleadoId : liquidacion.empleadoId._id;
  
  await validarEmpleadoYEmpresa(empleadoId, empresaId);

  const estadoAnterior = liquidacion.estado;
  const liquidacionActualizada = await liquidacionDb.update(id, payload);

  if (payload.estado && payload.estado !== estadoAnterior) {
    await registrarAuditoria({
      entidad: "liquidacion",
      entidadId: liquidacion._id,
      accion: "cambio_estado",
      descripcion: `La liquidacion ${liquidacion._id} cambio de ${estadoAnterior} a ${payload.estado}.`,
    });
  }

  await registrarAuditoria({
    entidad: "liquidacion",
    entidadId: liquidacion._id,
    accion: "modificacion",
    descripcion: `Se actualizo la liquidacion ${liquidacion._id}.`,
  });

  return liquidacionActualizada;
};

export const eliminarLiquidacion = async (id) => {
  const liquidacion = await liquidacionDb.findById(id);

  if (!liquidacion) {
    throw notFound("Liquidacion no encontrada.");
  }

  if (!liquidacion.activo) {
    throw badRequest("La liquidacion ya se encuentra inactiva.");
  }

  const liquidacionEliminada = await liquidacionDb.remove(id);

  await registrarAuditoria({
    entidad: "liquidacion",
    entidadId: liquidacion._id,
    accion: "baja_logica",
    descripcion: `Se dio de baja la liquidacion ${liquidacion._id}.`,
  });

  return liquidacionEliminada;
};
