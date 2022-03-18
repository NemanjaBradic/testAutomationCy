declare namespace Cypress {
    interface Chainable<Subject = any> {
        /**
         * @example cy.loginUser(username, password)
         */
        loginUser(username:any, password:any): Chainable<any>;

        /**
         * @example cy.logoutUser()
         */
         logoutUser(): Chainable<any>;
    }
}