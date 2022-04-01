/// <reference types="Cypress" />
import { loginPageErrors, loginPage } from '../../fixtures/constLoginPage'
import { user1AccountInfo } from '../../fixtures/constMainPage'

const user1 = Cypress.env("user1")
const user2 = Cypress.env("user2")

describe('Login Page suite', function() {

    beforeEach('Visit our application.', function () {
        cy.visit('/');
    });

    it('1. Login with empty username', function() {
        //cy.visit('/');
        cy.get('#username').clear();
        cy.get('#password').type(user1.password);
        cy.get('#username-helper-text').should('have.text', loginPageErrors.usernameRequired);
        cy.get('[data-test="signin-submit"]').should('be.disabled');
    });

    it('2. Login with empty password', function() {
        //cy.visit('/');
        cy.get('#username').type(user1.username);
        cy.get('#password').clear();
        cy.get('[data-test="signin-submit"]').should('be.disabled');
    });

    it('3. Login with empty username and password', function() {
        //cy.visit('/');
        cy.get('[data-test="signin-submit"]').click();
        cy.get('#username-helper-text').should('have.text', loginPageErrors.usernameRequired);
    });

    it('4. Login with wrong username', function() {
        //cy.visit('/');
        cy.get('#username').type(user2.username);
        cy.get('#password').type(user1.password);
        cy.get('[data-test="signin-submit"]').click();
        cy.get('[data-test="signin-error"]').should('have.text', loginPageErrors.signinError)
    });

    it('5. Login with wrong password', function() {
        //cy.visit('/');
        cy.get('#username').type(user1.username);
        cy.get('#password').type(user2.password);
        cy.get('[data-test="signin-submit"]').click();
        cy.get('[data-test="signin-error"]').should('have.text', loginPageErrors.signinError)
    });

    it.only('6. Login succesufully', function() {
        //cy.visit('/');
        cy.get('#username').type(user1.username);
        cy.get('#password').type(user1.password);
        cy.get('[data-test="signin-submit"]').click();
        cy.get('[data-test="sidenav-user-full-name"]').contains(user1AccountInfo.name);
        //cy.get('[data-test="sidenav-username"]').contains(user1AccountInfo.alias);
        //cy.get('[data-test="sidenav-username"]').contains(`@${user1.username}`);
        cy.get('[data-test="sidenav-username"]').contains('@'+user1.username);
    });

    it('7. Logout', function() {
        //cy.visit('/');
        cy.get('#username').type(user1.username);
        cy.get('#password').type(user1.password);
        cy.get('[data-test="signin-submit"]').click();
        //cy.wait(2000);
        cy.get('[data-test="sidenav-signout"]').click();
        cy.get('.MuiTypography-h5').contains(loginPage.signIn)
    });
});