import mongoose from 'mongoose';

const socioSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  apellido: { type: String, required: true, trim: true },
  dni: { type: String, required: true, unique: true, trim: true },
  email: { type: String, trim: true },
  telefono: { type: String, trim: true },
  participacion: { type: Number, required: true, min: 1, max: 100 },
  fechaIngreso: { type: Date },
  activo: { type: Boolean, default: true }
  }, 
  { timestamps: true }
);

export const Socio = mongoose.model('Socio', socioSchema);