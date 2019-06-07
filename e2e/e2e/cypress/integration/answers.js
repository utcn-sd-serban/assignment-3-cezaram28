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

    function addAnswer() {
        login("user1", "pass1");
        cy.get('[data-cy="addAnswerquestion1"]').click();

        cy.get('[data-cy="text"]').type("Text");
        cy.get('[data-cy="add"]').click();
        cy.get('[data-cy="answer"]').should("have.length", 1);
    }

    it("should add an answer", addAnswer);

    it("should upvote answer", function () {
        addAnswer();
        cy.get('[data-cy="logout"]').click({ force: true });
        login("user2", "pass2");
        cy.get('[data-cy="viewDetailsquestion1"]').click({ force: true });
        cy.get('[data-cy="upvoteText"]').click();
        cy.get('table').contains('td', '1');
    })

    it("should downvote answer", function () {
        addAnswer();
        cy.get('[data-cy="logout"]').click({ force: true });
        login("user2", "pass2");
        cy.get('[data-cy="viewDetailsquestion1"]').click({ force: true });
        cy.get('[data-cy="downvoteText"]').click();
        cy.get('table').contains('td', '-1');
    })

    it("should edit answer", function () {
        addAnswer();
        cy.get('[data-cy="editText"]').click({ force: true });
        cy.get('[data-cy="text"]').type("Edit");
        cy.get('[data-cy="edit"]').click();

        cy.get('table').contains('td', 'Edit');
    })

    it("should delete answer", function () {
        addAnswer();
        cy.get('[data-cy="deleteText"]').click({force: true});
        cy.get('[data-cy="answer"]').should("have.length", 0);
    })
});