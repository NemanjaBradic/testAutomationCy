/// <reference types="Cypress" />

describe('SingUp Test suite', function() {
    it('1. Navigate to Sing Up page', function() {
        cy.visit('/');
        cy.get('[data-test="signup"]').click();
        cy.get('[data-test="signup-title"]').should('have.text', 'Sign Up');
    });

    it('2. Click on Sing-up while all fields are not populated', function() {
        //TODO
    });

    it('3. Check if all sign up fields are mandatory and have proper error message', function() {
        //TODO
    });

    it('4. Populate all sign up fields and Sing Up button should be enabled', function() {
        //TODO
    });

    it('5. Navigate back to Sign In page', function() {
        //TODO
    });
});