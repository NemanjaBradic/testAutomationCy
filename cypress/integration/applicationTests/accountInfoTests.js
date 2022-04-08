/// <reference types="Cypress" />
import { mainNavigation } from '../../support/pom_objects/HeaderNavigationPage'
import { accountPage } from '../../support/pom_objects/myAccountPage'
import { accountInfo1, accountInfo2, myAccountTitle} from '../../fixtures/constAccount'

const user1 = Cypress.env("user1");

describe.only('My Account information suite', function(){
    before('Go to application', function(){
      cy.visit('/')
      cy.loginUser(user1.username, user1.password)
      Cypress.Cookies.preserveOnce('connect.sid')
    });

    after('Remove cookies', function(){
      cy.clearCookie('connect.sid')
    });

    it('My account navigation', function(){
      //cy.loginUser('Katharina_Bernier', 's3cret')'
      cy.get(mainNavigation.myAccount).click()
      cy.get(accountPage.title).should('have.text', myAccountTitle)
      cy.get(accountPage.firstName).should('have.value', accountInfo1.firstName)
      cy.get(accountPage.lastName).should('have.value', accountInfo1.lastName)
      cy.get(accountPage.email).should('have.value', accountInfo1.email)
      cy.get(accountPage.phoneNumber).should('have.value', accountInfo1.phoneNumber)
      cy.get(accountPage.saveButton).should('be.enabled')
    });

    it('Change account data', function(){
      //cy.loginUser('Katharina_Bernier', 's3cret')
      cy.get(mainNavigation.myAccount).click()
      cy.get(accountPage.title).should('have.text', myAccountTitle)
      cy.get(accountPage.firstName).clear().type(accountInfo2.firstName)
      cy.get(accountPage.lastName).clear().type(accountInfo2.lastName)
      cy.get(accountPage.email).clear().type(accountInfo2.email)
      cy.get(accountPage.phoneNumber).clear().type(accountInfo2.phoneNumber)
      cy.get(accountPage.saveButton).should('be.enabled')
    });
});

describe('Bank Account information suite', function(){
    const timestamp = new Date().getTime()

    beforeEach('Go to application', function(){
      cy.visit('/')
    });

    it('Bank accounts information', function(){
      cy.loginUser('Katharina_Bernier', 's3cret')
      cy.get('[data-test="sidenav-bankaccounts"]').click()
      cy.get('.MuiGrid-grid-xs-12 > .MuiPaper-root > .MuiGrid-align-items-xs-center')
        .contains('Bank Accounts')
      cy.get('[data-test="bankaccount-new"]').should('not.be.disabled')
      cy.get('[data-test="bankaccount-list-item-RskoB7r4Bic"] > .MuiGrid-container')
        .contains('O\'Hara - Labadie Bank')
      cy.get('[data-test="bankaccount-delete"]').should('be.enabled')
    });

    it('Create Bank account', function(){
      cy.loginUser('Katharina_Bernier', 's3cret')
      cy.get('[data-test="sidenav-bankaccounts"]').click()
      cy.get('[data-test="bankaccount-new"]').click()
      cy.get('.MuiPaper-root > .MuiTypography-root').contains('Create Bank Account')
      cy.get('#bankaccount-bankName-input').type('test Bank name ' + timestamp)
      cy.get('#bankaccount-routingNumber-input').type('567514521')
      cy.get('#bankaccount-accountNumber-input').type('123-454-321')
      cy.get('[data-test="bankaccount-submit"]').click()
      cy.wait(2000);
      cy.get('[data-test="bankaccount-list"]')
        .children()
        .contains('test Bank name ' + timestamp)
        .should('be.visible')
    });

    it('Delete created Bank account', function(){
      cy.loginUser('Katharina_Bernier', 's3cret')
      cy.get('[data-test="sidenav-bankaccounts"]').click()
      cy.get('[data-test="bankaccount-list"]')
        .children()
        .contains('test Bank name ' + timestamp)
        .parent()
        .parent()
        //.siblings()
        .find('[data-test="bankaccount-delete"]')
        .click()
        .click().then(() => {
          cy.get('[data-test="bankaccount-list"]')
            .contains('test Bank name ' + timestamp)
            .should('contain', '(Deleted)')
        })
    });
});