/// <reference types="Cypress" />

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

    cy.get(`label[data-error='${errors.email}']`)
      .first()
      .should("be.visible");

    cy.get(`label[data-error='${errors.message}']`)
      .first()
      .should("be.visible");
  });

  it("Submits Request", () => {
    cy.get("div[class='card']")
      .first()
      .find("label")
      .first()
      .click();

    cy.wait(60);

    cy.get("div[class='card']")
      .first()
      .find("input[name='name']")
      .click()
      .clear()
      .type("kuunika")
      .blur();

    cy.wait(60);

    cy.get("div[class='card']")
      .first()
      .find("label")
      .eq(1)
      .click();

    cy.get("div[class='card']")
      .first()
      .find("input[name='email']")
      .click()
      .clear()
      .type("kuunika@gmail.com")
      .blur();

    cy.wait(60);

    cy.get("div[class='card']")
      .first()
      .find("div[class='col input-field s12']")
      .eq(2)
      .click();

    cy.get("div[class='card']")
      .first()
      .find("ul")
      .first()
      .find("li")
      .eq(1)
      .click();

    cy.wait(60);

    cy.get("div[class='card']")
      .first()
      .find("label")
      .eq(2)
      .click();

    cy.get("div[class='card']")
      .first()
      .find("textarea[name='message']")
      .click()
      .clear()
      .type("message")
      .blur();

    cy.server();
    cy.route("POST", "http://127.0.0.1:4000/api/Feedbacks/feedback", {
      success: true
    }).as("feedback");

    cy.get("button[test-id='feedbackBtn']").click();

    cy.wait("@feedback");

    cy.get("@feedback").then(xhr => {
      cy.expect(xhr.request.body.data).to.deep.equal({
        email: "kuunika@gmail.com",
        feedbackType: "1",
        message: "message",
        name: "kuunika",
        type_id: "1"
      });
    });
  });
});
