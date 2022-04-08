import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import { request, payment, expectedResult} from '../../fixtures/constTransactions'

const user1 = Cypress.env("user1")

Given('user is logged in', () => {
    cy.visit('/')
    cy.loginUser(user1.username, user1.password);
});

When('user creates a new {string} transaction', (param) => {
    if (param === 'request')
        cy.newTransaction('[data-test="user-list-item-bDjUb4ir5O"]', request.amount, request.description, param)
    else if (param === 'payment')
        cy.newTransaction('[data-test="user-list-item-24VniajY1y"]', payment.amount, payment.description, param)
});

Then('transactions is requested', () => {
    cy.get('.MuiBox-root-67 > .MuiGrid-container > .MuiGrid-root > .MuiTypography-root')
      .should('have.text', expectedResult.expectedRequestText)
});

Then('transactions is payment', () => {
    cy.get('.MuiBox-root-67 > .MuiGrid-container > .MuiGrid-root > .MuiTypography-root')
      .should('have.text', expectedResult.expectedPaymentText)
});

And('user is redirected to {string} page', (text) => {
    cy.get('[data-test="new-transaction-return-to-transactions"] > .MuiButton-label').click()
    cy.get('.MuiListSubheader-root').contains(text) 
});

And('user is logged out', () => {
    cy.logoutUser()
});