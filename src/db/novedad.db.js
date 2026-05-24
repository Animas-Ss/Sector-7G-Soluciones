import { Novedad } from "../models/novedad.js";

const toPlainNovedad = (doc) => {
  if (!doc) return null;
  const plain = doc.toObject({ virtuals: false });
  return { ...plain, id: String(plain._id) };
};

export const novedadDb = {
  async getAll() {
    const rows = await Novedad.find().populate("empleadoId empresaId").lean();
    return rows.map((row) => ({ ...row, id: String(row._id) }));
  },

  async getById(id) {
    if (!id) return null;
    const doc = await Novedad.findById(id).populate("empleadoId empresaId");
    return toPlainNovedad(doc);
  },

  async create(entity) {
    const doc = await Novedad.create(entity);
    const populated = await Novedad.findById(doc._id).populate("empleadoId empresaId");
    return toPlainNovedad(populated);
  },

  async update(id, changes) {
    const doc = await Novedad.findByIdAndUpdate(id, changes, { new: true }).populate(
      "empleadoId empresaId",
    );
    return toPlainNovedad(doc);
  },

  async remove(id) {
    const doc = await Novedad.findByIdAndUpdate(
      id,
      { activo: false },
      { new: true },
    ).populate("empleadoId empresaId");
    return toPlainNovedad(doc);
  },
};
