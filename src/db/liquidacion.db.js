import { Liquidacion } from "../models/liquidacion.js";
import { Empleado } from "../models/empleado.js";
import { Empresa } from "../models/empresa.js";

export const liquidacionDb = {
  
  findAll: async () => {
    return await Liquidacion.find()
      .populate('empleadoId')
      .populate('empresaId');
  },
  
  findById: async (id) => {
    return await Liquidacion.findById(id)
      .populate('empleadoId')
      .populate('empresaId');
  },
  
  create: async (payload) => {
  
    const empleado = await Empleado.findById(payload.empleadoId);
    if (!empleado) throw new Error("El empleado indicado no existe en la base de datos.");
    
    const empresa = await Empresa.findById(payload.empresaId);
    if (!empresa) throw new Error("La empresa indicada no existe en la base de datos.");

    const nuevaLiquidacion = new Liquidacion(payload);
    return await nuevaLiquidacion.save();
  },
  
  update: async (id, payload) => {
    return await Liquidacion.findByIdAndUpdate(id, payload, { new: true });
  },
  
  delete: async (id) => {
    return await Liquidacion.findByIdAndDelete(id);
  }
};