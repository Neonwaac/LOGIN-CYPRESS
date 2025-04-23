import * as service from "../service/service.js";
export const submitUser = async (user) => {
  try {
    const { nombre, apellido, sexo, fecha } = user;
    return await service.submitUser(nombre, apellido, sexo, fecha);
  } catch (error) {
    console.error("Error en submitUser:", error.message);
    throw error;
  }
};
