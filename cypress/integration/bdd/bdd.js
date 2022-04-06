import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

const user1 = Cypress.env("user1") 

Given('user is logged in', () => {
    cy.visit('/')
    cy.loginUser(user1.username, user1.password);
});

When('user navigate to {string} tab', (tabName) => {
    cy.get('[data-test="nav-' + tabName + '-tab"]').click()
});

Then('user is on {string} tab', (tabName) => {
    cy.get('[data-test="nav-' + tabName + '-tab"]')
      .invoke('attr', 'aria-selected')
      .should('eql', 'true')
    cy.wait(2000)
});