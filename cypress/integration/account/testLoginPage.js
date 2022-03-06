/// <reference types="Cypress" />

describe('Login Page suite', function() {

    it('1. Login with empty username', function() {
        cy.visit('/');
        cy.get('#username').clear();
        cy.get('#password').type('s3cret');
        cy.get('#username-helper-text').should('have.text', 'Username is required');
        cy.get('[data-test="signin-submit"]').should('be.disabled');
    });

    it('2. Login with empty password', function() {
        cy.visit('/');
        cy.get('#username').type('Katharina_Bernier');
        cy.get('#password').clear();
        cy.get('[data-test="signin-submit"]').should('be.disabled');
    });

    it('3. Login with empty username and password', function() {
        cy.visit('/');
        cy.get('[data-test="signin-submit"]').click();
        cy.get('#username-helper-text').should('have.text', 'Username is required');
    });

    it('4. Login with wrong username', function() {
        cy.visit('/');
        cy.get('#username').type('test');
        cy.get('#password').type('s3cret');
        cy.get('[data-test="signin-submit"]').click();
        cy.get('[data-test="signin-error"]').should('have.text', 'Username or password is invalid')
    });

    it('5. Login with wrong password', function() {
        cy.visit('/');
        cy.get('#username').type('Katharina_Bernier');
        cy.get('#password').type('test');
        cy.get('[data-test="signin-submit"]').click();
        cy.get('[data-test="signin-error"]').should('have.text', 'Username or password is invalid')
    });

    it('6. Login succesufully', function() {
        cy.visit('/');
        cy.get('#username').type('Katharina_Bernier');
        cy.get('#password').type('s3cret');
        cy.get('[data-test="signin-submit"]').click();
        cy.get('[data-test="sidenav-user-full-name"]').contains('Edgar J');
        cy.get('[data-test="sidenav-username"]').contains('@Katharina_Bernier');
    });

    it('7. Logout', function() {
        cy.visit('/');
        cy.get('#username').type('Katharina_Bernier');
        cy.get('#password').type('s3cret');
        cy.get('[data-test="signin-submit"]').click();
        cy.wait(2000);
        cy.get('[data-test="sidenav-signout"]').click();
        cy.get('.MuiTypography-h5').contains('Sign in')
    });
});