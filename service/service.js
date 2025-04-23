export const submitUser = async (nombre, apellido, sexo, fecha) => {
  if (!nombre || !apellido || !sexo || !fecha) {
    throw new Error("Faltan campos obligatorios");
  }
  try {
    const age = await calculateAge(fecha);
    return { nombre, apellido, sexo, age };
  } catch (error) {
    throw new Error("Error al calcular la edad");
  }
};
export const calculateAge = async (fecha) => {
  if (typeof fecha !== "string") {
    throw new Error("Fecha debe ser una cadena de texto");
  }
  const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
  if (!regexFecha.test(fecha)) {
    throw new Error("Formato de fecha inválido. Use YYYY-MM-DD");
  }
  const birthDate = new Date(fecha);
  if (isNaN(birthDate.getTime())) {
    throw new Error("Fecha no válida");
  }
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  if (age < 0) {
    throw new Error("La fecha de nacimiento no puede ser en el futuro");
  }
  return age;
};
