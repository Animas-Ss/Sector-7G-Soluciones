import { Socio } from "../models/socio.js";

export const socioDb = {
  findAll: async () => await Socio.find(),
  
  findById: async (id) => await Socio.findById(id),
  
  create: async (payload) => {
    const nuevoSocio = new Socio(payload);
    return await nuevoSocio.save();
  },
  
  update: async (id, payload) => {
    return await Socio.findByIdAndUpdate(id, payload, { new: true });
  },
  
  delete: async (id) => {
    return await Socio.findByIdAndDelete(id);
  }
};