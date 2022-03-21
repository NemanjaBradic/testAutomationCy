/// <reference types="Cypress" />

import { eq } from "lodash";

describe('Main Page suite', function() {
    
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
    });

    it('Navigate to Notification page', function () {  
        cy.loginUser('Katharina_Bernier', 's3cret')
        cy.get('[data-test="sidenav-notifications"]').click().then(() => {
            cy.get('.MuiPaper-root > .MuiTypography-h6').should('have.text', 'Notifications')
            cy.get('[data-test="notifications-list"]').children().then((item) => {
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
        cy.get('[data-test="nav-top-notifications-count"]')
          .find('span')
          .then((value) =>{
            notificationNum = value[0].innerText;
          }).then(()=>{
                cy.get('[data-test="nav-top-notifications-link"]').click().then(() => {
                    cy.get('.MuiPaper-root > .MuiTypography-h6').should('have.text', 'Notifications')
                    cy.get('[data-test="notifications-list"]').children().then((item) => {
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