import { expect } from "chai";
import { submitUser } from "../controller/controller.js";

describe("submitUser - Integration Test", () => {
  it("Procesa correctamente una entrada válida", async () => {
    const fecha = "2000-10-10";
    const today = new Date();
    const birthDate = new Date(fecha);
    let expectedAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      expectedAge--;
    }
    const result = await submitUser({ nombre: "Laura", apellido: "Núñez", sexo: "F", fecha });
    expect(result.age).to.equal(expectedAge);
  });

  it("Detecta edad negativa para fecha futura", async () => {
    const result = await submitUser({ nombre: "Futuro", apellido: "Test", sexo: "X", fecha: "2100-01-01" });
    expect(result.age).to.be.lessThan(0);
  });

  it("Procesa correctamente recién nacidos (edad 0)", async () => {
    const today = new Date().toISOString().split("T")[0];
    const result = await submitUser({ nombre: "Bebé", apellido: "Hoy", sexo: "M", fecha: today });
    expect(result.age).to.equal(0);
  });

  it("Procesa fechas del siglo pasado", async () => {
    const result = await submitUser({ nombre: "Abuelo", apellido: "Pérez", sexo: "M", fecha: "1950-06-15" });
    expect(result.age).to.be.greaterThan(70);
  });

  it("Permite caracteres especiales en nombres", async () => {
    const result = await submitUser({ nombre: "Álvaro", apellido: "Ñíguez", sexo: "M", fecha: "1999-12-31" });
    expect(result.nombre).to.include("Álvaro");
  });

  it("Soporta valores personalizados en sexo", async () => {
    const result = await submitUser({ nombre: "Sam", apellido: "River", sexo: "Otro", fecha: "2002-03-03" });
    expect(result.sexo).to.equal("Otro");
  });

  it("Devuelve objeto con las claves correctas", async () => {
    const result = await submitUser({ nombre: "Leo", apellido: "Messi", sexo: "M", fecha: "1987-06-24" });
    expect(result).to.have.keys("nombre", "apellido", "sexo", "age");
  });

  it("Lanza error si falta 'fecha'", async () => {
    try {
      await submitUser({ nombre: "Error", apellido: "SinFecha", sexo: "F" });
      throw new Error("No lanzó error");
    } catch (error) {
      expect(error.message).to.equal("Faltan campos obligatorios");
    }
  });

  it("Lanza error con fecha malformada", async () => {
    try {
      await submitUser({ nombre: "Fecha", apellido: "Inválida", sexo: "M", fecha: "no-es-fecha" });
    } catch (error) {
      expect(error.message).to.equal("Error al calcular la edad");
    }
  });

  it("Edad 0 si nace hoy a última hora", async () => {
    const today = new Date().toISOString().split("T")[0];
    const result = await submitUser({ nombre: "Noche", apellido: "Tarde", sexo: "F", fecha: today });
    expect(result.age).to.equal(0);
  });
});

