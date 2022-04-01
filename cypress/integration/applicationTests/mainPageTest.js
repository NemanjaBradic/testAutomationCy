/// <reference types="Cypress" />
import { addDays, startOfDay } from "date-fns";
import { endOfDayUTC } from "../../../src/utils/transactionUtils";
import { request, payment, expectedResult} from '../../fixtures/constTransactions'
import { filter } from '../../fixtures/constMainPage'

const user1 = Cypress.env("user1")

describe('Main Page suite', function() {
    
    beforeEach('Visit our application.', function () {
        cy.visit('/');
    });

    it('Tabs navigation', function() {
      cy.loginUser(user1.username, user1.password);
      cy.tabNavigation('[data-test="nav-public-tab"]');
      cy.tabNavigation('[data-test="nav-contacts-tab"]');
      cy.tabNavigation('[data-test="nav-personal-tab"]');
      cy.logoutUser();
    });

    it('Create new transaction request', function() {
      cy.loginUser(user1.username, user1.password);
      cy.newTransaction('[data-test="user-list-item-bDjUb4ir5O"]', request.amount, request.description, 'request')
      cy.get('.MuiBox-root-67 > .MuiGrid-container > .MuiGrid-root > .MuiTypography-root')
        .should('have.text', expectedResult.expectedRequestText)
      cy.get('[data-test="new-transaction-return-to-transactions"] > .MuiButton-label').click()
      cy.get('.MuiListSubheader-root').contains('Public')
      cy.logoutUser()
    });

    it('Create new transaction pay', function() {
      cy.loginUser(user1.username, user1.password);
      cy.newTransaction('[data-test="user-list-item-24VniajY1y"]', payment.amount, payment.description, 'payment')
      cy.get('.MuiBox-root-67 > .MuiGrid-container > .MuiGrid-root > .MuiTypography-root')
        .should('have.text', expectedResult.expectedPaymentText)
      cy.get('[data-test="new-transaction-return-to-transactions"] > .MuiButton-label').click()
      cy.get('.MuiListSubheader-root').contains('Public')
      cy.logoutUser()
    });

    it('Filter by Date', function() {
      const dateStart = startOfDay(new Date(2022, 4, 1))
      const dateEnd = endOfDayUTC(addDays(dateStart, 20))
      cy.loginUser(user1.username, user1.password);
      cy.get('[data-test="transaction-list-filter-date-range-button"]').click({force: true})
      cy.pickDateRange(dateStart, dateEnd)
      cy.get('[data-test="empty-list-header"]').contains('No Transactions');
      cy.get('[data-test="transaction-list-empty-create-transaction-button"]').should('not.be.disabled')
      cy.logoutUser()
    });

    it.only('Filter by Amount', function() {
      //let min = 90, max = 180
      cy.loginUser(user1.username, user1.password);
      cy.get('[data-test="transaction-amount-183VHWyuQMS"]').should('be.visible')
      cy.setTransactionAmountRange(filter.min, filter.max)
      cy.get('[data-test="transaction-amount-183VHWyuQMS"]').should('not.exist')
      cy.get('[data-test="transaction-list-filter-amount-clear-button"]').click()
      cy.get('[data-test="transaction-amount-183VHWyuQMS"]').should('be.visible')
      cy.get('body').click(0,0)
      cy.logoutUser()
    });

    it('HIde and show options', function() {
      cy.loginUser(user1.username, user1.password);
      cy.get('[data-test="sidenav-toggle"]').click()
      cy.get('[data-test="sidenav-home"] > .MuiListItemText-root > .MuiTypography-root')
        .should('not.be.visible')
      cy.get('[data-test="sidenav-toggle"]').click()
      cy.get('[data-test="sidenav-home"] > .MuiListItemText-root > .MuiTypography-root')
        .should('be.visible')
      cy.logoutUser()
    });

});