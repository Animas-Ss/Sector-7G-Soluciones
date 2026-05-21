import mongoose from 'mongoose';

const liquidacionSchema = new mongoose.Schema({
  empleadoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true },
  empresaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa', required: true},
  periodo: { type: String, required: true, trim: true},
  concepto: { type: String, trim: true },
  totalBruto: { type: Number, required: true },
  totalNeto: { type: Number, required: true },
  estado: { type: String, default: 'pendiente', trim: true },
  activo: { type: Boolean, default: true }
  }, 
  {  timestamps: true }
);

export const Liquidacion = mongoose.model('Liquidacion', liquidacionSchema);