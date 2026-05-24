import mongoose from "mongoose";

const novedadSchema = new mongoose.Schema(
  {
    empleadoId: { type: mongoose.Schema.Types.ObjectId, ref: "Empleado", required: true },
    empresaId: { type: mongoose.Schema.Types.ObjectId, ref: "Empresa", required: true },
    tipo: { type: String, required: true, trim: true },
    estado: {
      type: String,
      enum: ["pendiente", "procesada", "rechazada"],
      default: "pendiente",
      trim: true,
    },
    descripcion: { type: String, required: true, trim: true },
    fecha: { type: String, required: true },
    activo: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Novedad =
  mongoose.models.Novedad || mongoose.model("Novedad", novedadSchema);

// Compat helpers used by existing services (kept minimal)
export const createNovedad = (payload) => ({
  tipo: payload.tipo?.trim(),
  descripcion: payload.descripcion?.trim(),
  estado: payload.estado ? payload.estado.trim() : "pendiente",
  fecha: payload.fecha,
  empresaId: payload.empresaId,
  empleadoId: payload.empleadoId,
  activo: true,
});

export const updateNovedad = (_currentNovedad, payload) => ({
  ...(payload.tipo !== undefined ? { tipo: payload.tipo.trim() } : {}),
  ...(payload.descripcion !== undefined ? { descripcion: payload.descripcion.trim() } : {}),
  ...(payload.estado !== undefined ? { estado: payload.estado.trim() } : {}),
  ...(payload.fecha !== undefined ? { fecha: payload.fecha } : {}),
  ...(payload.empresaId !== undefined ? { empresaId: payload.empresaId } : {}),
  ...(payload.empleadoId !== undefined ? { empleadoId: payload.empleadoId } : {}),
  ...(payload.activo !== undefined ? { activo: Boolean(payload.activo) } : {}),
});
