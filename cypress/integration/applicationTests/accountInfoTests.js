/// <reference types="Cypress" />

describe.only('My Account information suite', function(){
    before('Go to application', function(){
      cy.visit('/')
      cy.loginUser('Katharina_Bernier', 's3cret')
      Cypress.Cookies.preserveOnce('connect.sid')
    });

    after('Remove cookies', function(){
      cy.clearCookie('connect.sid')
    });

    it('My account navigation', function(){
      //cy.loginUser('Katharina_Bernier', 's3cret')
      cy.get('[data-test="sidenav-user-settings"]').click()
      cy.get('.MuiPaper-root > .MuiTypography-root').should('have.text', 'User Settings')
      cy.get('[data-test="user-settings-firstName-input"]').should('have.value', 'Edgar')
      cy.get('[data-test="user-settings-lastName-input"]').should('have.value', 'Johns')
      cy.get('[data-test="user-settings-email-input"]').should('have.value', 'Norene39@yahoo.com')
      cy.get('[data-test="user-settings-phoneNumber-input"]').should('have.value', '625-316-9882')
      cy.get('[data-test="user-settings-submit"]').should('be.enabled')
    });

    it('Change account data', function(){
      //cy.loginUser('Katharina_Bernier', 's3cret')
      cy.get('[data-test="sidenav-user-settings"]').click()
      cy.get('.MuiPaper-root > .MuiTypography-root').should('have.text', 'User Settings')
      cy.get('[data-test="user-settings-firstName-input"]').clear().type('Test First Name')
      cy.get('[data-test="user-settings-lastName-input"]').clear().type('QA Last Name')
      cy.get('[data-test="user-settings-email-input"]').clear().type('testQA@example.com')
      cy.get('[data-test="user-settings-phoneNumber-input"]').clear().type('123-555-2222')
      cy.get('[data-test="user-settings-submit"]').should('be.enabled')
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