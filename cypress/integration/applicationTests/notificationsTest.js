/// <reference types="Cypress" />
import { mainHeader, mainNavigation } from '../../support/pom_objects/HeaderNavigationPage'
import { NotificationPage } from '../../support/pom_objects/NotificationPage'

describe('Notifications suite', function() {
    
    const expected = [
        'Ibrahim Dickens liked a transaction.',
        'Kaylin Homenick received payment.',
        'Kaylin Homenick requested payment.',
        'Edgar Johns received payment.',
        'Edgar Johns commented on a transaction.',
        'Edgar Johns requested payment.',
        'Edgar Johns received payment.',
        'Edgar Johns requested payment.'
    ]
    beforeEach('Visit our application.', function () {
        cy.visit('/');
        //cy.fixture('/public-transactions.json').as('publicTransaction')
        cy.intercept('GET', 'http://localhost:3001/notifications').as('notification')
        //cy.intercept('GET', 'http://localhost:3001/notifications', []).as('notification2')
    });

    it('Navigate to Notification page', function () {  
        cy.loginUser('Katharina_Bernier', 's3cret')
        cy.get(mainNavigation.notifications).click().then(() => {
            cy.get(NotificationPage.notificationTitle).should('have.text', 'Notifications')
            cy.get(NotificationPage.notificationList).children().then((item) => {
                for(let i = 0; i < item.length; i++){
                    cy.get('li')
                      .eq(i)
                      .find('div')
                      .eq(1)
                      .find('span')
                      .should('have.text', expected[i])
                }
            })
        })
    });

    it('Check Notification bell', function () {
        let notificationNum;
        cy.loginUser('Katharina_Bernier', 's3cret')
        cy.wait(7000)
        //cy.wait('@notification')
        cy.get(mainHeader.notificationCount)
          .find('span')
          .then((value) =>{
            notificationNum = value[0].innerText;
          }).then(()=>{
                cy.get(mainHeader.notificationLink).click().then(() => {
                    cy.get(NotificationPage.notificationTitle).should('have.text', 'Notifications')
                    //cy.wait('@notification2')
                    cy.get(NotificationPage.notificationList).children().then((item) => {
                        expect(item.length).to.be.eq(Number(notificationNum));
                        for(let i = 0; i < item.length; i++){
                            cy.get('li')
                              .eq(i)
                              .find('div')
                              .eq(1)
                              .find('span')
                              .should('have.text', expected[i])
                        }
                    })
                })
            })
    });
});