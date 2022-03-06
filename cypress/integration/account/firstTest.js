/// <reference types="Cypress" />

describe('First Test suite', function() {
    it('1. Access Test Application', function() {
        cy.visit('/');
        cy.get('.makeStyles-logo-3').should.exist;
        cy.get('.MuiTypography-h5').contains('Sign in')
        cy.get('.MuiContainer-root > .MuiTypography-root').should('have.text', 'Built by');
    });
});