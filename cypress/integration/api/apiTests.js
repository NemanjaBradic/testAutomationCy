const baseURL = Cypress.env("apiUrl");
const expected = [
    'Ibrahim Dickens', 
    'Kaylin Homenick', 
    'Kaylin Homenick', 
    'Edgar Johns', 
    'Edgar Johns', 
    'Edgar Johns',
    'Edgar Johns',
    'Edgar Johns'
]

describe('API test suite', function() {
    let username = 'Katharina_Bernier';
    let password = 's3cret';
    beforeEach('Authenticate', function() {
        cy.loginByApi(username, password);
    });

    it('Get notification', function() {
        cy.request("GET", `${baseURL}/notifications`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.results.length).to.be.greaterThan(0);
            for(let i = 0; i < response.body.results.length; i++) {
                expect(response.body.results[i].userFullName).to.eq(expected[i])
            }
          });
    });

    it.only('Get transactions', function() {
        cy.request("GET", `${baseURL}/transactions`).then((response) => {
            expect(response.status).to.eq(200);
            console.log(response.body);
          });
    });
});