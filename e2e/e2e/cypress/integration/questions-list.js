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

    it("should show 2 questions", function () {
        login("user2", "pass2");

        //cy.visit("#/questions-list");

        cy.get('[data-cy="question"]').should("have.length", 2);
    });

    it("should add a question", function () {
        login("user2", "pass2");
        cy.get('[data-cy="addQuestion"]').click();

        cy.get('[data-cy="title"]').type("Title");
        cy.get('[data-cy="text"]').type("Text");
        cy.get('[data-cy="tags"]').type("Tags");

        cy.get('[data-cy="addQuestion"]').click();
        cy.visit("#/questions-list");
        cy.get('[data-cy="question"]').should("have.length", 3);
    })

    it("should upvote question", function () {
        login("user2", "pass2");
        cy.get('[data-cy="upvotequestion1"]').click();
        cy.get('table').contains('td', '1');
    }) 

    it("should downvote question", function () {
        login("user2", "pass2");
        cy.get('[data-cy="downvotequestion1"]').click();
        cy.get('table').contains('td', '-1');
    })

    it("should edit question", function () {
        login("user1", "pass1");
        cy.get('[data-cy="editquestion1"]').click();
        cy.get('[data-cy="title"]').type("Edit");
        cy.get('[data-cy="text"]').type("Edit");
        cy.get('[data-cy="edit"]').click();
        
        cy.get('table').contains('td', 'Edit');
    })

    it("should delete question", function () {
        login("user1", "pass1");
        cy.get('[data-cy="deletequestion1"]').click();
        cy.get('[data-cy="question"]').should("have.length", 1);
    })
});