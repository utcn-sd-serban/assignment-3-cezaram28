describe("The questions list", function () {

    beforeEach(function () {
        cy.request("http://localhost:8080/test/reseed")
            .its("status").should("be.equal", 200);
    });

    function login(username, password) {
        cy.visit("#/login");
        cy.get('[data-cy="username"]').type(username);
        cy.get('[data-cy="password"]').type(password);
        cy.get('[data-cy="login"]').click();
    }

    it("should ban a user", function () {
        login("user1", "pass1");
        cy.get('[data-cy="usersButton"]').click();
        cy.get('[data-cy="banws"]').click();

        cy.visit("#/login");
        cy.get('[data-cy="username"]').type("ws");
        cy.get('[data-cy="password"]').type("ws");
        cy.get('[data-cy="login"]').click();
        cy.url().should('eq', 'http://localhost:3000/#/login');
        
    });
});