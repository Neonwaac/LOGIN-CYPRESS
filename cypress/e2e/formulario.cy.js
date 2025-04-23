describe('Formulario NEONWAAC', () => {
  const baseUrl = 'http://127.0.0.1:5500/index.html';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('Carga correctamente la página', () => {
    cy.get('#formulario').should('exist');
  });

  it('Permite llenar todos los campos correctamente', () => {
    cy.get('#nombre').type('Juan');
    cy.get('#apellido').type('Pérez');
    cy.get('#sexo').select('Hombre');
    cy.get('#fecha').type('2000-01-01');
    cy.get('#enviar').click();
  });

  it('Valida que el nombre sea obligatorio', () => {
    cy.get('#apellido').type('Pérez');
    cy.get('#sexo').select('Mujer');
    cy.get('#fecha').type('2001-01-01');
    cy.get('#enviar').click();
    cy.get('#nombre:invalid').should('exist');
  });

  it('Valida que el apellido sea obligatorio', () => {
    cy.get('#nombre').type('Ana');
    cy.get('#sexo').select('Mujer');
    cy.get('#fecha').type('2001-01-01');
    cy.get('#enviar').click();
    cy.get('#apellido:invalid').should('exist');
  });

  it('Valida que el sexo sea obligatorio', () => {
    cy.get('#nombre').type('Pedro');
    cy.get('#apellido').type('López');
    cy.get('#fecha').type('2002-05-05');
    cy.get('#enviar').click();
    cy.get('#sexo:invalid').should('exist');
  });

  it('Valida que la fecha sea obligatoria', () => {
    cy.get('#nombre').type('Laura');
    cy.get('#apellido').type('Gómez');
    cy.get('#sexo').select('Mujer');
    cy.get('#enviar').click();
    cy.get('#fecha:invalid').should('exist');
  });

  it('Acepta caracteres especiales en los campos de texto', () => {
    cy.get('#nombre').type('Álvaro');
    cy.get('#apellido').type('Ñíguez');
    cy.get('#sexo').select('Hombre');
    cy.get('#fecha').type('1999-12-31');
    cy.get('#enviar').click();
  });

  it('Permite seleccionar "Mujer" como sexo', () => {
    cy.get('#sexo').select('Mujer').should('have.value', 'mujer');
  });

  it('Permite enviar el formulario con fecha reciente válida', () => {
    const today = new Date().toISOString().split('T')[0];
    cy.get('#nombre').type('Hoy');
    cy.get('#apellido').type('Día');
    cy.get('#sexo').select('Hombre');
    cy.get('#fecha').type(today);
    cy.get('#enviar').click();
  });

  it('No permite enviar si todos los campos están vacíos', () => {
    cy.get('#enviar').click();
    cy.get('#nombre:invalid').should('exist');
    cy.get('#apellido:invalid').should('exist');
    cy.get('#sexo:invalid').should('exist');
    cy.get('#fecha:invalid').should('exist');
  });
});
