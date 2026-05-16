/**
 * Modelo Mongoose — Usuario
 * Representa a los usuarios del sistema (administradores y operadores).
 * TODO (3ra entrega): almacenar contraseñas hasheadas con bcrypt.
 */
import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema(
  {
    usuario: {
      type: String,
      required: [true, 'El nombre de usuario es obligatorio'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
    },
    rol: {
      type: String,
      enum: {
        values: ['admin', 'operador'],
        message: 'El rol debe ser "admin" u "operador"',
      },
      default: 'operador',
      required: true,
    },
  },
  { timestamps: true }
);

export const Usuario = mongoose.model('Usuario', usuarioSchema);
