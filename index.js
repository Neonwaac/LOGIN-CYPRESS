import * as controller from "./controller/controller.js";
document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario");
  const enviarBtn = document.getElementById("enviar");
  enviarBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const sexo = document.getElementById("sexo").value;
    const fecha = document.getElementById("fecha").value;
    if (!nombre || !apellido || !sexo || !fecha) {
      console.error("Faltan campos obligatorios");
      return;
    }
    try {
      const user = { nombre, apellido, sexo, fecha };
      const newUser = await controller.submitUser(user);
      const encodedUser = encodeURIComponent(JSON.stringify(newUser));
      window.location.href = "./welcome.html?user=" + encodedUser;
    } catch (error) {
      console.error("Error al procesar el usuario:", error);
    }
  });
});
