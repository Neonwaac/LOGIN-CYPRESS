describe('Ciclo completo de envío de formulario', () => {
  const baseUrl = 'http://127.0.0.1:5500/index.html';

  const casos = [
    { nombre: 'Juan', apellido: 'Pérez', sexo: 'hombre', fecha: '2000-01-01' },
    { nombre: 'Ana', apellido: 'Gómez', sexo: 'mujer', fecha: '1995-06-15' },
    { nombre: 'Luis', apellido: 'Martínez', sexo: 'hombre', fecha: '1988-12-30' },
    { nombre: 'Lucía', apellido: 'Ramírez', sexo: 'mujer', fecha: '2002-03-22' },
    { nombre: 'Carlos', apellido: 'Fernández', sexo: 'hombre', fecha: '1990-11-09' },
  ];

  casos.forEach((usuario, index) => {
    it(`Caso ${index + 1}: Envía el formulario correctamente`, () => {
      cy.visit(baseUrl);

      cy.get('#nombre').type(usuario.nombre);
      cy.get('#apellido').type(usuario.apellido);
      cy.get('#sexo').select(usuario.sexo);
      cy.get('#fecha').type(usuario.fecha);

      cy.get('#enviar').click();

      cy.url().should('include', 'welcome.html?user=');

      cy.visit(baseUrl);
    });
  });
});