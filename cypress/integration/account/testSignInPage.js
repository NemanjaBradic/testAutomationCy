/// <reference types="Cypress" />
import { loginPageErrors, loginPage } from '../../fixtures/constLoginPage'
import { user1AccountInfo } from '../../fixtures/constMainPage'
import { SignInHeader, SignInForm } from '../../support/pom_objects/SignInPage'
import { accountInfo, mainNavigation} from '../../support/pom_objects/HeaderNavigationPage'

const user1 = Cypress.env("user1")
const user2 = Cypress.env("user2")

describe('Login Page suite', function() {

    beforeEach('Visit our application.', function () {
        cy.visit('/');
    });

    it('1. Login with empty username', function() {
        //cy.visit('/');
        cy.get(SignInForm.username).clear();
        cy.get(SignInForm.password).type(user1.password);
        cy.get(SignInForm.usernameError).should('have.text', loginPageErrors.usernameRequired);
        cy.get(SignInForm.signIn).should('be.disabled');
    });

    it('2. Login with empty password', function() {
        //cy.visit('/');
        cy.get(SignInForm.username).type(user1.username);
        cy.get(SignInForm.password).clear();
        cy.get(SignInForm.signIn).should('be.disabled');
    });

    it('3. Login with empty username and password', function() {
        //cy.visit('/');
        cy.get(SignInForm.signIn).click();
        cy.get(SignInForm.usernameError).should('have.text', loginPageErrors.usernameRequired);
    });

    it('4. Login with wrong username', function() {
        //cy.visit('/');
        cy.get(SignInForm.username).type(user2.username);
        cy.get(SignInForm.password).type(user1.password);
        cy.get(SignInForm.signIn).click();
        cy.get(SignInForm.signInError).should('have.text', loginPageErrors.signinError)
    });

    it('5. Login with wrong password', function() {
        //cy.visit('/');
        cy.get(SignInForm.username).type(user1.username);
        cy.get(SignInForm.password).type(user2.password);
        cy.get(SignInForm.signIn).click();
        cy.get(SignInForm.signInError).should('have.text', loginPageErrors.signinError)
    });

    it('6. Login succesufully', function() {
        //cy.visit('/');
        cy.get(SignInForm.username).type(user1.username);
        cy.get(SignInForm.password).type(user1.password);
        cy.get(SignInForm.signIn).click();
        cy.get(accountInfo.fullName).contains(user1AccountInfo.name);
        //cy.get('[data-test="sidenav-username"]').contains(user1AccountInfo.alias);
        //cy.get('[data-test="sidenav-username"]').contains(`@${user1.username}`);
        cy.get(accountInfo.usernameInfo).contains('@'+user1.username);
    });

    it('7. Logout', function() {
        //cy.visit('/');
        cy.get(SignInForm.username).type(user1.username);
        cy.get(SignInForm.password).type(user1.password);
        cy.get(SignInForm.signIn).click();
        //cy.wait(2000);
        cy.get(mainNavigation.signout).click();
        cy.get(SignInHeader.title).contains(loginPage.signIn)
    });
});