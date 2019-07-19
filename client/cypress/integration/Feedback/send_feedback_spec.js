/// <reference types="Cypress" />

const validateSelect = (name, error) => {
  cy.get(`[data-test=${name}]`)
    .first()
    .click();

  cy.get(`[id=menu-${name}]`)
    .first()
    .click();
  cy.get("[data-test=formFooter]")
    .first()
    .click();

  cy.get(`[data-test=fieldError${name}]`)
    .first()
    .should("be.visible")
    .contains(error);
};

const type = (fieldName, value) => {
  cy.get(`input[name=${fieldName}]`)
    .first()
    .click()
    .clear()
    .type(value)
    .blur();
};

const selectFirst = fieldName => {
  cy.get(`[data-test=${fieldName}]`)
    .first()
    .click();

  cy.get(`[id=menu-${fieldName}] ul li`)
    .first()
    .click();
};

describe("Feedback Page Test", () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  const FRONTEND_URL = Cypress.env("FRONT_END_URL");
  const errors = {
    email: "email is a required field",
    message: "message is a required field"
  };

  it("Navigates to feedback page", () => {
    cy.visit(FRONTEND_URL);
    cy.get("[data-test=menuMore]").click();
    cy.get("[data-test=menuFeedback]").click();
  });

  it("Validates Required Fields on submit", () => {
    cy.get("[data-test=feedbackBtn]").click();

    cy.get(`[data-test='fieldErroremail']`)
      .first()
      .should("be.visible")
      .contains(errors.email);

    cy.get(`[data-test=fieldErrormessage]`)
      .first()
      .should("be.visible")
      .contains(errors.message);
  });

  it("Submits Request", () => {
    type("name", "kuunika");

    type("email", "kuunika@gmail.com");

    selectFirst("feedbackType");

    cy.get(`textarea[name=message]`)
      .first()
      .click()
      .clear()
      .type("message")
      .blur();

    cy.server();
    cy.route("POST", "http://127.0.0.1:4000/api/Feedbacks/feedback", {
      success: true
    }).as("feedback");

    cy.get("[data-test=feedbackBtn]").click();

    cy.wait("@feedback");

    cy.get("@feedback").then(xhr => {
      cy.expect(xhr.request.body.data).to.deep.equal({
        email: "kuunika@gmail.com",
        feedbackType: 1,
        message: "message",
        name: "kuunika",
        type_id: 1
      });
    });
  });
});
