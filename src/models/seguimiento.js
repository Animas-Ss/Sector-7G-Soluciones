import mongoose from "mongoose";

const seguimientoSchema = new mongoose.Schema(
  {
    novedadId: { type: mongoose.Schema.Types.ObjectId, ref: "Novedad", required: true },
    fecha: { type: String, required: true },
    responsable: { type: String, trim: true },
    comentario: { type: String, trim: true },
    // Compatibility fields with PLAN_TRABAJO.md
    estado: { type: String, trim: true },
    observacion: { type: String, trim: true },
    activo: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Seguimiento =
  mongoose.models.Seguimiento || mongoose.model("Seguimiento", seguimientoSchema);

// Compat helpers used by existing services (kept minimal)
export const createSeguimiento = (payload) => ({
  novedadId: payload.novedadId,
  fecha: payload.fecha,
  responsable: payload.responsable?.trim(),
  comentario: payload.comentario?.trim(),
  estado: payload.estado?.trim() || payload.responsable?.trim(),
  observacion: payload.observacion?.trim() || payload.comentario?.trim(),
  activo: true,
});

export const updateSeguimiento = (_currentSeguimiento, payload) => ({
  ...(payload.novedadId !== undefined ? { novedadId: payload.novedadId } : {}),
  ...(payload.fecha !== undefined ? { fecha: payload.fecha } : {}),
  ...(payload.responsable !== undefined ? { responsable: payload.responsable.trim() } : {}),
  ...(payload.comentario !== undefined ? { comentario: payload.comentario.trim() } : {}),
  ...(payload.estado !== undefined ? { estado: payload.estado.trim() } : {}),
  ...(payload.observacion !== undefined ? { observacion: payload.observacion.trim() } : {}),
  ...(payload.activo !== undefined ? { activo: Boolean(payload.activo) } : {}),
});
