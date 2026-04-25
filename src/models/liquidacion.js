import { nowIso } from "../libs/time.js";

export const createLiquidacion = (payload) => {
  const timestamp = nowIso();

  return {
    empresaId: Number(payload.empresaId),
    empleadoId: Number(payload.empleadoId),
    periodo: payload.periodo.trim(),
    concepto: payload.concepto.trim(),
    monto: Number(payload.monto),
    estado: payload.estado ? payload.estado.trim() : "pendiente",
    activo: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
};

export const updateLiquidacion = (currentLiquidacion, payload) => ({
  ...currentLiquidacion,
  empresaId:
    payload.empresaId !== undefined
      ? Number(payload.empresaId)
      : currentLiquidacion.empresaId,
  empleadoId:
    payload.empleadoId !== undefined
      ? Number(payload.empleadoId)
      : currentLiquidacion.empleadoId,
  periodo:
    payload.periodo !== undefined
      ? payload.periodo.trim()
      : currentLiquidacion.periodo,
  concepto:
    payload.concepto !== undefined
      ? payload.concepto.trim()
      : currentLiquidacion.concepto,
  monto:
    payload.monto !== undefined ? Number(payload.monto) : currentLiquidacion.monto,
  estado:
    payload.estado !== undefined
      ? payload.estado.trim()
      : currentLiquidacion.estado,
});
