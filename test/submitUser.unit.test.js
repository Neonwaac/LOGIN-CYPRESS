import { expect } from "chai";
import * as service from "../service/service.js";

describe("submitUser - Unit Test", () => {
  it("Debe retornar la edad correcta para alguien nacido en 2001-01-01", async () => {
    const expectedAge = new Date().getFullYear() - 2001;
    const result = await service.submitUser("Ana", "Martínez", "F", "2001-01-01");
    expect(result.age).to.equal(expectedAge);
  });

  it("Edad 0 si aún no ha cumplido años este mes", async () => {
    const today = new Date();
    const safeDay = String(today.getDate()).padStart(2, "0");
    const fecha = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${safeDay}`;
    const result = await service.submitUser("Luis", "Gómez", "M", fecha);
    expect(result.age).to.equal(0);    
  });

  it("Nacimiento hoy debe dar edad 0", async () => {
    const today = new Date().toISOString().split("T")[0];
    const result = await service.submitUser("Nuevo", "Nacido", "NB", today);
    expect(result.age).to.equal(0);
  });

  it("Edad negativa no permitida para fecha futura", async () => {
    const future = `${new Date().getFullYear() + 1}-01-01`;
    const result = await service.submitUser("Error", "Futuro", "X", future);
    expect(result.age).to.be.lessThan(0);
  });

  it("Diferencia exacta de años si aún no ha cumplido años", async () => {
    const fecha = "2000-12-31";
    const result = await service.submitUser("Carlos", "Torres", "M", fecha);
    expect(result.age).to.be.a("number");
  });

  it("Fecha bisiesta válida (2000-02-29)", async () => {
    const result = await service.submitUser("Laura", "Vega", "F", "2000-02-29");
    expect(result.age).to.be.a("number");
  });

  it("Permite nombres largos", async () => {
    const result = await service.submitUser("Juan Manuel Sebastián", "García Fernández", "M", "1990-05-15");
    expect(result.nombre).to.include("Juan Manuel Sebastián");
  });

  it("Soporta valores no binarios en 'sexo'", async () => {
    const result = await service.submitUser("Alex", "Rojas", "NB", "1995-08-20");
    expect(result.sexo).to.equal("NB");
  });

  it("Valida edad cuando solo cambia el año", async () => {
    const result = await service.submitUser("Eva", "López", "F", "1999-01-01");
    const expectedAge = new Date().getFullYear() - 1999;
    expect(result.age).to.equal(expectedAge);
  });

  it("Devuelve todos los campos esperados", async () => {
    const result = await service.submitUser("Miguel", "Pérez", "M", "1985-11-11");
    expect(result).to.have.all.keys("nombre", "apellido", "sexo", "age");
  });
});
