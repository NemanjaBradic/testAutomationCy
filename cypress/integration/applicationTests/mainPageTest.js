/// <reference types="Cypress" />
import { addDays, startOfDay } from "date-fns";
import { endOfDayUTC } from "../../../src/utils/transactionUtils";

describe('Main Page suite', function() {
    
    beforeEach('Visit our application.', function () {
        cy.visit('/');
    });

    it('Tabs navigation', function() {
      cy.loginUser('Katharina_Bernier', 's3cret');
      cy.tabNavigation('[data-test="nav-public-tab"]');
      cy.tabNavigation('[data-test="nav-contacts-tab"]');
      cy.tabNavigation('[data-test="nav-personal-tab"]');
      cy.logoutUser();
    });

    it('Create new transaction request', function() {
      let amount = 123, description = 'test request' 
      cy.loginUser('Katharina_Bernier', 's3cret')
      cy.newTransaction('[data-test="user-list-item-bDjUb4ir5O"]', amount, description, 'request')
      cy.get('.MuiBox-root-67 > .MuiGrid-container > .MuiGrid-root > .MuiTypography-root')
        .should('have.text','Requested $'+ amount + '.00 for ' + description)
      cy.get('[data-test="new-transaction-return-to-transactions"] > .MuiButton-label').click()
      cy.get('.MuiListSubheader-root').contains('Public')
      cy.logoutUser()
    });

    it.only('Create new transaction pay', function() {
      let amount = 123, description = 'test pay' 
      cy.loginUser('Katharina_Bernier', 's3cret')
      cy.newTransaction('[data-test="user-list-item-24VniajY1y"]', amount, description, 'payment')
      cy.get('.MuiBox-root-67 > .MuiGrid-container > .MuiGrid-root > .MuiTypography-root')
        .should('have.text','Paid $'+ amount + '.00 for ' + description)
      cy.get('[data-test="new-transaction-return-to-transactions"] > .MuiButton-label').click()
      cy.get('.MuiListSubheader-root').contains('Public')
      cy.logoutUser()
    });

    it('Filter by Date', function() {
      const dateStart = startOfDay(new Date(2022, 4, 1))
      const dateEnd = endOfDayUTC(addDays(dateStart, 20))
      cy.loginUser('Katharina_Bernier', 's3cret')
      cy.get('[data-test="transaction-list-filter-date-range-button"]').click({force: true})
      cy.pickDateRange(dateStart, dateEnd)
      cy.get('[data-test="empty-list-header"]').contains('No Transactions');
      cy.get('[data-test="transaction-list-empty-create-transaction-button"]').should('not.be.disabled')
      cy.logoutUser()
    });

    it('Filter by Amount', function() {
      let min = 90, max = 180
      cy.loginUser('Katharina_Bernier', 's3cret')
      cy.get('[data-test="transaction-amount-183VHWyuQMS"]').should('be.visible')
      cy.setTransactionAmountRange(min, max)
      cy.get('[data-test="transaction-amount-183VHWyuQMS"]').should('not.exist')
      cy.get('[data-test="transaction-list-filter-amount-clear-button"]').click()
      cy.get('[data-test="transaction-amount-183VHWyuQMS"]').should('be.visible')
      cy.get('body').click(0,0)
      cy.logoutUser()
    });

    it('HIde and show options', function() {
      cy.loginUser('Katharina_Bernier', 's3cret')
      cy.get('[data-test="sidenav-toggle"]').click()
      cy.get('[data-test="sidenav-home"] > .MuiListItemText-root > .MuiTypography-root')
        .should('not.be.visible')
      cy.get('[data-test="sidenav-toggle"]').click()
      cy.get('[data-test="sidenav-home"] > .MuiListItemText-root > .MuiTypography-root')
        .should('be.visible')
      cy.logoutUser()
    });

});